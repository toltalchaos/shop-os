// @ts-nocheck
import { env } from '$env/dynamic/public';
import { PRIVATE_SENDER_APP_PASSWORD } from '$env/static/private';
import NewOrder from './newOrder.svelte';
import NewOrderAdmin from './newOrderAdmin.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

const transporter = nodemailer.createTransport({
	service: env.PUBLIC_EMAIL_SERVICE,
	auth: {
		user: env.PUBLIC_SENDER_GMAIL,
		pass: PRIVATE_SENDER_APP_PASSWORD
	}
});

export async function POST(requestEvent) {
	const emailData = await requestEvent.request.json();
	sendAdminEmail(emailData, env.PUBLIC_SENDER_GMAIL);
	return sendCustomerEmail(emailData, env.PUBLIC_SENDER_GMAIL);
}

function sendCustomerEmail(emailData, senderEmail) {
	const mailHTML = render({
		template: NewOrder,
		props: { orderNumber: emailData.order_id, orderData: emailData.orderData, senderEmail: senderEmail}
	});

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: emailData.orderData.customerEmail,
		subject: 'New Order Recieved!',
		html: mailHTML
	};

	const emaiResponse = new Response (transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return String(error);
		} else {
			return String('Email sent: ' + info.response);
		}
	}));
	return emaiResponse;
}
function sendAdminEmail(emailData, senderEmail) {
	const mailHTML = render({
		template: NewOrderAdmin,
		props: { orderNumber: emailData.order_id, orderData: emailData.orderData, senderEmail: senderEmail }
	});

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: env.PUBLIC_SENDER_GMAIL,
		subject: 'New Order Recieved!',
		html: mailHTML
	};

	const emaiResponse = new Response (transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return String(error);
		} else {
			return String('Email sent: ' + info.response);
		}
	}));
	return emaiResponse;
}
