// @ts-nocheck
import { env } from '$env/dynamic/public';
import NewOrder from './newOrder.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.PUBLIC_SENDER_GMAIL,
		pass: env.PUBLIC_SENDER_APP_PASSWORD
	}
});

export async function POST(requestEvent) {
	const emailData = await requestEvent.request.json();
	// console.log(emailData, 'emailData');
	// {
	//     order_id: 'test@test.test-e1s2g',
	//     orderData: {
	//       items: [ [Object] ],
	//       customerName: 'test@test.test',
	//       customerEmail: 'test@test.test',
	//       shippingAddress: '',
	//       postalCode: '',
	//       city: '',
	//       totals: {
	//         subtotal: 10.99,
	//         shipping: 0,
	//         tax: 0.5495,
	//         taxRate: 0.05,
	//         total: 11.5395
	//       }
	//     },
	//     status: [
	//       {
	//         order_id: 'test@test.test-e1s2g',
	//         status: 'payment pending',
	//         comments: 'order has been submitted',
	//         tracking_number: '',
	//         shipping_carrier: '',
	//         shipping_date: '',
	//         link: '',
	//         update_time: '2024-05-01T18:51:13.585Z'
	//       }
	//     ]
	//   } emailData
	const mailHTML = render({
		template: NewOrder,
		props: { orderNumber: emailData.order_id }
	});

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: 'braydontol@gmail.com',
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
}
