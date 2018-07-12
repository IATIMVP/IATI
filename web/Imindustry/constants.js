const messages = {

}

const httpStatus = {
    success: 200,
    noContent: 204,
    badRequest: 400,
    created: 201,
    accepted: 202,
    nonAuthInfo: 203,
    unauthorized: 401,
    forbidden: 403,
    subscriptionRequired: 402,
    notAcceptable: 406,
    internalServerErr: 500,
    conflict: 409,
    found: 302,
    processing: 102,
    noDataFound: 410,
    methodNotAllowed: 405,
    middlewareAuth: 507
}


const gmailSMTPCredentials = {
    "service": "gmail",
    "host": "smtp.gmail.com",
    "username": "babyapp69@gmail.com",
    "password": "babyapp123"
}

var baseUrl = "http://52.34.207.5:4173";

// uk :  elephanda0a-21
//us: lephanda-20

var obj = {
    messages: messages,
    httpStatus: httpStatus,
    gmailSMTPCredentials: gmailSMTPCredentials,
};
module.exports = obj;