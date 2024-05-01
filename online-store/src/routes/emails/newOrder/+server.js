// @ts-nocheck
import { env } from '$env/dynamic/public';
import { PRIVATE_SENDER_APP_PASSWORD } from '$env/static/private';
import NewOrder from './newOrder.svelte';
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
	sendAdminEmail(emailData);
	return sendCustomerEmail(emailData);
}

function sendCustomerEmail(emailData) {
	const mailHTML = render({
		template: NewOrder,
		props: { orderNumber: emailData.order_id }
	});

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: emailData.orderData.customerEmail,
		subject: 'New Order Recieved!',
		html: mailHTML
	};

	const emaiResponse = new Response (transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error, 'error');
			return String(error);
		} else {
			console.log('Email sent: ' + info.response);
			return String('Email sent: ' + info.response);
		}
	}));
	return emaiResponse;
	return new Response('success', { status: 200, statusText: 'OK' });
}
function sendAdminEmail(emailData) {
	const mailHTML = render({
		template: NewOrder,
		props: { orderNumber: emailData.order_id, orderData: emailData.orderData }
	});

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: env.PUBLIC_SENDER_GMAIL,
		subject: 'New Order Recieved!',
		html: mailHTML
	};

	const emaiResponse = new Response (transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error, 'error');
			return String(error);
		} else {
			console.log('Email sent: ' + info.response);
			return String('Email sent: ' + info.response);
		}
	}));
	return emaiResponse;
	return new Response('success', { status: 200, statusText: 'OK' });
}
