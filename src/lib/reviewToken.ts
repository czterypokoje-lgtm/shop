import 'server-only';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * The personal review link: /review/<orderId>/<token>. The token is an HMAC of
 * the order id, so only the customer who got the email can write about that
 * order's products. Without a secret configured, links are not issued at all.
 */
const secret = () => process.env.REVIEW_SECRET || process.env.ORDER_WEBHOOK_SECRET || '';

export const reviewToken = (orderId: string): string | null =>
  secret() ? createHmac('sha256', secret()).update(`review:${orderId}`).digest('base64url').slice(0, 32) : null;

export function reviewTokenValid(orderId: string, token: string): boolean {
  const want = reviewToken(orderId);
  return Boolean(want) && want!.length === token.length && timingSafeEqual(Buffer.from(want!), Buffer.from(token));
}
