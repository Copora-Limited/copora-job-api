"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailFooter = emailFooter;
function emailFooter() {
    return `
    <tr>
      <td>
        <footer style="
            background-color: #EAF0F3;
            border-top: 1px solid #ddd;
            padding: 20px 0;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #000000;
        ">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
          ">
            <tr>
              <td style="text-align: center;">
                <div style="
                    display: inline-flex;
                    justify-content: center;
                    gap: 15px;
                    align-items: center;
                ">
                  <a href="https://instagram.com/use_nidi" style="color: #000000; text-decoration: none;">
                    <img src="https://res.cloudinary.com/dhcikhvpu/image/upload/v1728681342/COPORA_IG_oc5r7i.png" alt="Instagram" style="width: 24px; height: 24px;">
                  </a>
                  <a href="https://x.com/usenidi?s=21&t=DJhnfOr8u2WipeCDcSFy9A" style="color: #000000; text-decoration: none;">
                    <img src="https://res.cloudinary.com/dhcikhvpu/image/upload/v1728681342/COPORA_X_gkddqh.png" alt="X (Twitter)" style="width: 24px; height: 24px;">
                  </a>
                  <a href="https://www.linkedin.com/company/usenidi/" style="color: #000000; text-decoration: none;">
                    <img src="https://res.cloudinary.com/dhcikhvpu/image/upload/v1728681653/COPORA_IN_mw4ldq_p6kjvr.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                  </a>
                  <a href="https://www.youtube.com/channel/usenidi" style="color: #000000; text-decoration: none;">
                    <img src="https://res.cloudinary.com/dhcikhvpu/image/upload/v1728681653/COPORA_YT_x4omls_y1mwgb.png" alt="YouTube" style="width: 24px; height: 24px;">
                  </a>
                </div>
                <p style="margin-top: 15px; font-size: 14px; color: #666666;">
                  &copy; ${new Date().getFullYear()} Copora. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </footer>
      </td>
    </tr>
    </table>
    </body>
    </html>
  `;
}
