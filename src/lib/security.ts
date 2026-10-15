import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

// Secret key for HMAC token signing (falls back to a default high-entropy key if not set in .env)
const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'tagline_sec_vault_k8x991b_2026_super_dragon_key';

export interface DownloadTokenPayload {
  productId: string;
  orderId: string;
  email: string;
  exp: number; // UNIX timestamp in ms
  maxDownloads: number;
  issuedAt: number;
}

export interface VerifyResult {
  valid: boolean;
  payload?: DownloadTokenPayload;
  error?: 'EXPIRED' | 'INVALID_SIGNATURE' | 'MALFORMED' | 'NOT_FOUND';
}

/**
 * Generate a cryptographically signed download token
 */
export function createDownloadToken(params: {
  productId: string;
  orderId: string;
  email?: string;
  expiryHours?: number;
  maxDownloads?: number;
}): string {
  const expiryHours = params.expiryHours ?? 48; // default 48h expiration
  const exp = Date.now() + expiryHours * 60 * 60 * 1000;

  const payload: DownloadTokenPayload = {
    productId: params.productId,
    orderId: params.orderId,
    email: params.email || 'customer@tagline.store',
    exp,
    maxDownloads: params.maxDownloads ?? 3,
    issuedAt: Date.now(),
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  return `dl_${payloadBase64}.${signature}`;
}

/**
 * Verify and unpack a cryptographically signed download token
 */
export function verifyDownloadToken(rawToken: string): VerifyResult {
  // Support legacy demo/sample starter pack tokens for testing
  if (rawToken === 'sample-freebie-starter-pack' || rawToken === 'sample-download-pack') {
    return {
      valid: true,
      payload: {
        productId: 'freebie_starter',
        orderId: 'demo_freebie',
        email: 'demo@tagline.store',
        exp: Date.now() + 86400000,
        maxDownloads: 10,
        issuedAt: Date.now(),
      },
    };
  }

  if (!rawToken || !rawToken.startsWith('dl_')) {
    return { valid: false, error: 'MALFORMED' };
  }

  const tokenContent = rawToken.slice(3); // strip 'dl_'
  const parts = tokenContent.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'MALFORMED' };
  }

  const [payloadBase64, signature] = parts;

  // Verify HMAC signature using timing-safe comparison
  const expectedSignature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedSigBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedSigBuffer)) {
    return { valid: false, error: 'INVALID_SIGNATURE' };
  }

  try {
    const jsonStr = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    const payload: DownloadTokenPayload = JSON.parse(jsonStr);

    // Verify expiration timestamp
    if (Date.now() > payload.exp) {
      return { valid: false, payload, error: 'EXPIRED' };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false, error: 'MALFORMED' };
  }
}

/**
 * Mapping of product ID to safe private vault filename
 */
const VAULT_FILE_MAP: Record<string, { fileName: string; mimeType: string }> = {
  freebie_starter: {
    fileName: 'sample-freebie-starter-pack.pdf',
    mimeType: 'application/pdf',
  },
  dulo_1: {
    fileName: 'dulo-whispering-woods.pdf',
    mimeType: 'application/pdf',
  },
  dulo_2: {
    fileName: 'dulo-coloring-sheets.pdf',
    mimeType: 'application/pdf',
  },
  dulo_3: {
    fileName: 'dulo-papercraft-gliders.pdf',
    mimeType: 'application/pdf',
  },
  prod_1: {
    fileName: 'forest-coloring-sheets.pdf',
    mimeType: 'application/pdf',
  },
  prod_2: {
    fileName: 'paper-rocket-kit.pdf',
    mimeType: 'application/pdf',
  },
  prod_3: {
    fileName: 'math-workbook.pdf',
    mimeType: 'application/pdf',
  },
  prod_4: {
    fileName: 'alphabet-workbook.pdf',
    mimeType: 'application/pdf',
  },
  prod_5: {
    fileName: 'cozy-family-planner.pdf',
    mimeType: 'application/pdf',
  },
  prod_6: {
    fileName: 'starlight-bedtime-guide.pdf',
    mimeType: 'application/pdf',
  },
};

/**
 * Resolve local private vault file path safely (prevent directory traversal)
 */
export function getVaultFilePath(productId: string): { filePath: string; fileName: string; mimeType: string } | null {
  const mapping = VAULT_FILE_MAP[productId] || VAULT_FILE_MAP['freebie_starter'];
  const vaultDir = path.resolve(process.cwd(), 'storage', 'private-vault');
  const safeFilePath = path.resolve(vaultDir, mapping.fileName);

  // Path traversal check
  if (!safeFilePath.startsWith(vaultDir)) {
    console.error('Security alert: Directory traversal attempt detected for product:', productId);
    return null;
  }

  if (!fs.existsSync(safeFilePath)) {
    return null;
  }

  return {
    filePath: safeFilePath,
    fileName: mapping.fileName,
    mimeType: mapping.mimeType,
  };
}
