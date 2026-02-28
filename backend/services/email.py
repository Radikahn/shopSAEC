import resend

from config import settings
from models import CartItemSchema

resend.api_key = settings.RESEND_API_KEY


def build_confirmation_html(order_id: str, cart_item: CartItemSchema, total: int) -> str:
    short_id = order_id[-6:].upper()
    return f"""\
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0f1e;font-family:'JetBrains Mono',monospace,sans-serif;color:#d0d0d0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0f1e;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding:24px;border-bottom:1px solid rgba(191,219,254,0.2);">
          <span style="font-size:18px;color:#d0d0d0;">SAEC Shop</span>
        </td></tr>

        <!-- Title -->
        <tr><td style="padding:24px 24px 8px;">
          <span style="font-size:16px;color:#d0d0d0;">Order Confirmation</span><br>
          <span style="font-size:12px;color:#888;">Order #{short_id}</span>
        </td></tr>

        <!-- Order Summary -->
        <tr><td style="padding:16px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="border:2px solid rgba(191,219,254,0.2);border-radius:8px;padding:24px;">
            <tr><td style="padding-bottom:12px;">
              <span style="font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">
                Order Summary
              </span>
            </td></tr>
            <tr><td>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;padding-right:16px;">
                    <span style="font-size:14px;color:#d0d0d0;">{cart_item.item}</span><br><br>
                    <span style="font-size:13px;color:#aaa;">
                      Size:
                      <span style="margin-left:8px;padding:2px 8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.1);border-radius:16px;font-size:11px;">
                        {cart_item.size.value}
                      </span>
                    </span><br>
                    <span style="font-size:13px;color:#aaa;display:inline-block;margin-top:6px;">
                      Qty: {cart_item.quantity}
                    </span><br>
                    <span style="font-size:13px;color:#aaa;display:inline-block;margin-top:6px;">
                      ${cart_item.price}.00{" each" if cart_item.quantity > 1 else ""}
                    </span>
                  </td>
                </tr>
              </table>
            </td></tr>

            <!-- Totals -->
            <tr><td style="padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);margin-top:16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:13px;color:#888;padding:4px 0;">Subtotal</td>
                  <td align="right" style="font-size:13px;color:#888;padding:4px 0;">${total}.00</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#888;padding:4px 0;">Shipping</td>
                  <td align="right" style="font-size:13px;color:#888;padding:4px 0;">Free</td>
                </tr>
                <tr>
                  <td style="font-size:14px;color:#d0d0d0;padding:12px 0 4px;border-top:1px solid rgba(255,255,255,0.1);">
                    Total
                  </td>
                  <td align="right" style="font-size:14px;color:#d0d0d0;padding:12px 0 4px;border-top:1px solid rgba(255,255,255,0.1);">
                    ${total}.00
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Payment Note -->
        <tr><td style="padding:16px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0"
                 style="background:rgba(0,140,255,0.1);border:1px solid rgba(0,140,255,0.2);border-radius:8px;padding:16px;">
            <tr><td style="text-align:center;">
              <span style="font-size:13px;color:#7cb8ff;">
                Payment via Venmo to @sjsu_saec
              </span>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px;border-top:1px solid rgba(191,219,254,0.1);text-align:center;">
          <span style="font-size:11px;color:#555;">
            SJSU Society of Automotive Engineers Club
          </span>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""


async def send_confirmation_email(
    to_email: str,
    order_id: str,
    cart_item: CartItemSchema,
    total: int,
) -> None:
    if not settings.RESEND_API_KEY:
        return

    html = build_confirmation_html(order_id, cart_item, total)
    short_id = order_id[-6:].upper()

    resend.Emails.send(
        {
            "from": settings.RESEND_FROM_EMAIL,
            "to": [to_email],
            "subject": f"SAEC Order Confirmation - #{short_id}",
            "html": html,
        }
    )
