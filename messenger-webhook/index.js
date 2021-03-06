'use strict';
/**
 *  https://onlacademy-789799818-chatbot.herokuapp.com/
 */

require('dotenv').config()
// Imports dependencies and set up http server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express(); // creates express http server

app.use(express.json());

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const LIVE_URL = process.env.LIVE_URL;

const CLIENT_URL = process.env.CLIENT_URL;

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

    let body = req.body;
    console.log(body)
    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(async function (entry) {
            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                await handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                await handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

var incorrectReturn = {
    "text": "C??u l???nh kh??ng h???p l???, g?? !help all ????? bi???t c??u l???nh ph?? h???p, !help <m?? l???nh> ????? xem chi ti???t c??u l???nh"
}

// Handles messages events
async function handleMessage(sender_psid, received_message) {
    let response;
    console.log("Handle message")
    console.log("received_message", received_message)
    if (received_message.quick_reply) {
        response = await handleGetCourseByCategory(received_message.quick_reply.payload)

    }
    // Check if the message contains text
    else if (received_message.text) {

        // Create the payload for a basic text message
        // response = {
        //     "text": `You sent the message: "${received_message.text}". Now send me an image!`
        // }
        response = await handleTextMessage(received_message.text);

        console.log("response", response);
    }
    // Sends the response message
    await callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
async function handlePostback(sender_psid, received_postback) {
    // let response = incorrectReturn;

    // Get the payload for the postback
    console.log("Postback")
    let payload = received_postback.payload;

    let tokens = payload.split(" ");
    let response = { "text": "Invalid" };

    if (tokens[0] == '1') {
        response = await handleDetailMessage(tokens[1]);
    }
    else if (tokens[0] == '2') {
        console.log("???? v??o ph???n 2 ")
        response = await handleGetCourseByCategory(tokens[1])
    }






    // // Set the response based on the postback payload
    // if (payload === 'yes') {
    //     response = { "text": "Thanks!" }
    // } else if (payload === 'no') {
    //     response = { "text": "Oops, try sending another image." }
    // }
    // // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
async function callSendAPI(sender_psid, response) {
    console.log("response", response)
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "messaging_type": "RESPONSE",
        "message": response
    }

    await axios.post("https://graph.facebook.com/v11.0/me/messages", request_body, {
        params: {
            "access_token": process.env.PAGE_ACCESS_TOKEN
        }
    }).then(res => {
        console.log('Message sent!');
    }).catch(e => {
        console.error("Unable to send message:" + e);
    })

}

async function handleTextMessage(text) {
    try {
        if (text.charAt(0) == '!') {
            let res = { "text": "???? v??o handle text message" }
            let newText = text.substring(1);

            if (newText.localeCompare("cate") == 0) {
                res = await handleGetCateMessage();
                return res;
            }

            let index = newText.indexOf(' ');
            if (index == -1) {
                return incorrectReturn;
            }

            let command = newText.substring(0, index);
            let data = newText.substring(index + 1);

            if (command.localeCompare("help") == 0) {
                res = await handleHelpMessage(data);
            }
            else if (command.localeCompare("search") == 0) {
                res = await handleSearchMessage(data);
            }
            else if (command.localeCompare("detail") == 0) {
                res = await handleDetailMessage(data);
            }
            else if (command.localeCompare("cateCourse") == 0) {
                res = await handleGetCourseByCategory(data);
            }
            else {
                res = { "text": "C??u l???nh sai: " + command + ", text l??: " + text };
            }

            return res;
        }
        else {
            return incorrectReturn;
        }
    }
    catch (e) {
        console.log(e)
    }
}

function handleHelpMessage(data) {
    let res = incorrectReturn;
    console.log(data);
    switch (data) {
        case "all":
            res = {
                "text": "C??c l???nh: !<t??n l???nh>\n!search - T??m ki???m\n!cate - Xem kh??a h???c theo l??nh v???c\n!help <t??n l???nh> - H?????ng d???n chi ti???t l???nh"
            }
            break;
        case "search":
            res = {
                "text": "!search <T??? kh??a c???n t??m>"
            }
            break;
        case "cate":
            res = {
                "text": "!cate"
            }
            break;
        // case "detail":
        //     res = {
        //         "text": "!detail <M?? kh??a h???c>"
        //     }
        //     break;
    }
    return res;
}


async function handleSearchMessage(data) {

    const finalData = await axios.get(LIVE_URL + '/courses/search', {
        params: {
            keyword: data,
            limit: 5,
            page: 1
        }
    }).then(res => {
        if (res.status === 200) {
            let receivedData = res.data;

            console.log("receivedData", receivedData)

            let elements = receivedData.courses.map(d => {
                return ({
                    "title": d.courseName,
                    "image_url": LIVE_URL + '/files/send?fileName=' + d.imageThumbnail,
                    "default_action": {
                        "type": "web_url",
                        "url": CLIENT_URL + "/detail/" + d._id,
                        "webview_height_ratio": "tall",
                    },
                    "buttons": [
                        {
                            "type": "web_url",
                            "url": CLIENT_URL + "/detail/" + d._id,
                            "title": "????ng k?? ngay!"
                        }, {
                            "type": "postback",
                            "title": "Xem chi ti???t",
                            "payload": "1 " + d._id
                        }
                    ]
                })
            })

            console.log("elements:", elements)

            if (elements.length == 0) {
                return ({
                    "text": "Kh??ng c?? kh??a h???c h???p v???i t??? kh??a"
                })
            }

            return ({
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": elements
                    }
                }
            })
        }
    }).catch(e => {
        return incorrectReturn;
    })

    return finalData;

}

// async function handleGetCateMessage(data) {
//     const finalData = await axios.get(LIVE_URL + '/courses/cateName', {
//         params: {
//             categoryName: data,
//             limit: 3,
//             page: 1
//         }
//     }).then(res => {
//         if (res.status === 200) {
//             let receivedData = res.data;

//             console.log("receivedData", receivedData)

//             let elements = receivedData.courses.map(d => {
//                 return ({
//                     "title": d.courseName,
//                     "image_url": LIVE_URL + '/files/send?fileName=' + d.imageThumbnail,
//                     "default_action": {
//                         "type": "web_url",
//                         "url": "https://leetcode.com",
//                         "webview_height_ratio": "tall",
//                     },
//                     "buttons": [
//                         {
//                             "type": "web_url",
//                             "url": "https://leetcode.com",
//                             "title": "????ng k?? ngay!"
//                         }, {
//                             "type": "postback",
//                             "title": "All",
//                             "payload": "!detail dosomething"
//                         }
//                     ]
//                 })
//             })

//             console.log("elements:", elements)

//             if (elements.length == 0) {
//                 return ({
//                     "text": "Kh??ng c?? kh??a h???c h???p v???i t??? kh??a"
//                 })
//             }

//             return ({
//                 "attachment": {
//                     "type": "template",
//                     "payload": {
//                         "template_type": "generic",
//                         "elements": elements
//                     }
//                 }
//             })
//         }
//     }).catch(e => {
//         return incorrectReturn;
//     })

//     return finalData;
// }

async function handleGetCourseByCategory(data) {
    const finalData = await axios.get(LIVE_URL + '/courses/category?limit=5&page=1&categoryId=' + data)
        .then(res => {
            if (res.status === 200) {
                let receivedData = res.data;

                console.log("receivedData", receivedData)

                let elements = receivedData.map(d => {
                    return ({
                        "title": d.courseName,
                        "image_url": LIVE_URL + '/files/send?fileName=' + d.imageThumbnail,
                        "default_action": {
                            "type": "web_url",
                            "url": CLIENT_URL + "/detail/" + d._id,
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": CLIENT_URL + "/detail/" + d._id,
                                "title": "????ng k?? ngay!"
                            }, {
                                "type": "postback",
                                "title": "Xem chi ti???t",
                                "payload": "1 " + d._id
                            }
                        ]
                    })
                })

                console.log("elements:", elements)

                if (elements.length == 0) {
                    return ({
                        "text": "Kh??ng c?? kh??a h???c trong l??nh v???c n??y"
                    })
                }

                return ({
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": elements
                        }
                    }
                })
            }
        }).catch(e => {
            console.log(e);
            return incorrectReturn;
        })

    return finalData;
}

async function handleGetCateMessage() {
    const finalData = await axios.get(LIVE_URL + '/categories')
        .then(res => {
            if (res.status === 200) {
                let receivedData = res.data;

                console.log("receivedData", receivedData)

                let elements = receivedData.map(d => {
                    return ({
                        "content_type": "text",
                        "title": d.categoryName,
                        "payload": d._id
                    })
                })

                console.log("elements:", elements)

                // if (elements.length == 0) {
                //     return ({
                //         "text": "Kh??ng c?? kh??a h???c h???p v???i t??? kh??a"
                //     })
                // }

                return ({
                    "text": "Ch???n 1 l??nh v???c:",
                    "quick_replies": elements
                })
            }
        }).catch(e => {
            console.log(e);
            return incorrectReturn;
        })

    return finalData;
}



async function handleDetailMessage(data) {
    const detail = await axios.get(LIVE_URL + '/courses/id?id=' + data)
        .then(res => {
            let detail = res.data;
            console.log(detail);


            return {
                "text": `T??n kh??a h???c: ${detail.courseName}\nT??n gi??o vi??n: ${detail.teacherName}\nGi???i thi???u: ${detail.detailShort}\nGi??: ${detail.salePrice}`
            }
        }).catch(e => {
            return {
                "text": "R???t ti???c, m???t l???i khong mong mu???n ???? x???y ra, vui l??ng th??? l???i sau"
            };
        })

    return detail;
}

