// @ts-nocheck
import { env } from '$env/dynamic/public';
import OrderUpdate from './orderUpdate.svelte';
import nodemailer from 'nodemailer';
import { render } from 'svelte-email';

const transporter = nodemailer.createTransport({
	service: env.PUBLIC_EMAIL_SERVICE,
	auth: {
		user: env.PUBLIC_SENDER_GMAIL,
		pass: env.PUBLIC_SENDER_APP_PASSWORD
	}
});

export async function POST(requestEvent) {
	const emailData = await requestEvent.request.json();
	// console.log(emailData, 'emailData');
    // {
    //     order_id: 1,
    //     customerName: 'John Doe',
    //     customerEmail: '',
    //     status: [
    //       {
    //         order_id: 1,
    //         status: 'order has been submitted',
    //         comments: 'comments go here...\t',
    //         tracking_number: '1234567890',
    //         shipping_carrier: 'USPS',
    //         shipping_date: '2021-01-01',
    //         link: 'https://www.usps.com/1234567890',
    //         update_time: '2021-01-01'
    //       },
    //       {
    //         order_id: 1,
    //         comments: 'comment!',
    //         status: 'order placed',
    //         tracking_number: 'tracking no',
    //         shipping_carrier: 'carrier',
    //         shipping_date: '2024-05-27',
    //         link: '',
    //         update_time: '2024-05-01T19:18:48.905Z'
    //       }
    //     ]
    //   } emailData

    const mailHTML = render({
        template: OrderUpdate,
        props: { orderNumber: emailData.order_id, status: emailData.status[emailData.status.length - 1] }
    });

	const mailOptions = {
		from: env.PUBLIC_SENDER_GMAIL,
		to: env.PUBLIC_SENDER_GMAIL,
		subject: 'Order Update (order: ' + emailData.order_id + ')',
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
