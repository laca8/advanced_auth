import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

// ✅ 1. إرسال إيميل التحقق
export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		const html = VERIFICATION_EMAIL_TEMPLATE.replace(
			"{verificationCode}",
			verificationToken
		);

		const info = await transporter.sendMail({
			from: `"${sender.name}" <${sender.email}>`,
			to: email,
			subject: "Verify your email",
			html,
		});

		console.log("✅ Verification email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("❌ Error sending verification email:", error);
		throw new Error(`Error sending verification email: ${error.message}`);
	}
};


// ✅ 2. إرسال إيميل الترحيب
export const sendWelcomeEmail = async (email, name) => {
	try {
		const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);

		const info = await transporter.sendMail({
			from: `"${sender.name}" <${sender.email}>`,
			to: email,
			subject: "Welcome to Auth Company 🎉",
			html,
		});

		console.log("✅ Welcome email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("❌ Error sending welcome email:", error);
		throw new Error(`Error sending welcome email: ${error.message}`);
	}
};


// ✅ 3. إرسال إيميل طلب استعادة كلمة المرور
export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

		const info = await transporter.sendMail({
			from: `"${sender.name}" <${sender.email}>`,
			to: email,
			subject: "Reset your password",
			html,
		});

		console.log("✅ Password reset email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("❌ Error sending password reset email:", error);
		throw new Error(`Error sending password reset email: ${error.message}`);
	}
};


// ✅ 4. إرسال إيميل نجاح إعادة تعيين كلمة المرور
export const sendResetSuccessEmail = async (email) => {
	try {
		const html = PASSWORD_RESET_SUCCESS_TEMPLATE;

		const info = await transporter.sendMail({
			from: `"${sender.name}" <${sender.email}>`,
			to: email,
			subject: "Password Reset Successful",
			html,
		});

		console.log("✅ Password reset success email sent:", info.messageId);
		return info;
	} catch (error) {
		console.error("❌ Error sending password reset success email:", error);
		throw new Error(`Error sending password reset success email: ${error.message}`);
	}
};
