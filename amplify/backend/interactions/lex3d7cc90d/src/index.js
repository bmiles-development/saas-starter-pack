const response = require('./cfn-response');
const aws = require('aws-sdk');
const iam = new aws.IAM();
const lambdaClient = new aws.Lambda({ apiVersion: '2017-04-19' });
exports.handler = function(event, context) {
    const lex = new aws.LexModelBuildingService({ apiVersion: '2017-04-19', region: event.ResourceProperties.lexRegion });
    if (event.RequestType == 'Delete') {
        response.send(event, context, response.SUCCESS);
        return;
    }
    let newSlotTypeParams = [
        
        
        {
            "name": "AppointmentTypeValue",
            "description": "Type of dentist appointment to schedule",
            "enumerationValues": [
                
                {
                    "value": "cleaning"
                },
                
                {
                    "value": "whitening"
                },
                
                {
                    "value": "root canal"
                },
                
            ]
        },
        
        
    ];
    let intentParams = [
        
        {
            "name": "MakeAppointment",
            
            "confirmationPrompt": {
                "maxAttempts": 2, 
                "messages": [
                    {
                        "content": "{Time} is available, should I go ahead and book your appointment?", 
                        "contentType": "PlainText"
                    }
                ]
            }, 
            
            
            "rejectionStatement": {
                "messages": [
                    {
                    "content": "Okay, I will not schedule an appointment.", 
                    "contentType": "PlainText"
                    }
                ]
            }, 
        
            "sampleUtterances": [
            
                "Book a ​{AppointmentType}​",
            
                "Book an appointment",
            
                "I would like to book an appointment",
            
            ],
        
            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },
        
            "slots": [
                
                {
                    "name": "AppointmentType",
                    "slotConstraint": "Required",
                    "priority": 0,
                    "slotType": "AppointmentTypeValue",
                    "slotTypeVersion": "$LATEST",
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "What type of appointment would you like to schedule?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
                {
                    "name": "Date",
                    "slotConstraint": "Required",
                    "priority": 1,
                    "slotType": "AMAZON.DATE",
                    
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "When should I schedule your appointment?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
                {
                    "name": "Time",
                    "slotConstraint": "Required",
                    "priority": 2,
                    "slotType": "AMAZON.TIME",
                    
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "At what time should I schedule your appointment?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
            ]
        },
        
    ];
    let botName = "ScheduleAppointment";
    if(process.env.ENV && process.env.ENV !== "NONE") {
      botName = botName + '_' + process.env.ENV;
    }

    let botParams = {
        "name": botName,
        "intents": [
        
            {
                "intentName": "MakeAppointment",
                "intentVersion": "$LATEST"
            },
        
        ],
        "childDirected": false,
        "locale": "en-US",
        "abortStatement": {
            "messages": [
                {
                    "content": "I don't understand. Can you try again?", 
                    "contentType": "PlainText"
                }, 
                {
                    "content": "I'm sorry, I don't understand.", 
                    "contentType": "PlainText"
                }
            ]
        }, 
        "clarificationPrompt": {
            "maxAttempts": 3, 
            "messages": [
                {
                    "content": "I'm sorry, I didn't hear that. Can you repeat what you just said?", 
                    "contentType": "PlainText"
                }, 
                {
                    "content": "Can you say that again?", 
                    "contentType": "PlainText"
                }
            ]
        }, 
        
        "voiceId": "Matthew",
        
        
        "idleSessionTTLInSeconds": "300"
        
    };
    
    checkAndCreateLexServiceRole()
    .then(()=>{ return getSlotTypes(newSlotTypeParams, lex);})
    .then(()=>{ return putSlotTypes(newSlotTypeParams, lex);})
    .then(()=>{ return getIntents(intentParams, lex);})
    .then(()=>{ return putIntents(intentParams, lex);})
    .then(()=>{ return getBot(botParams, lex);})
    .then(()=>{ return putBot(botParams, lex);})
    .then((res) => {
        response.send(event, context, response.SUCCESS, res.ApplicationResponse);
    })
    .catch((err) => {
        console.log(err.stack);
        response.send(event, context, response.FAILED, {Error: err});
        throw err;
    });
};

function checkAndCreateLexServiceRole() {
    
    return checkIfLexServiceRoleExists()
    .then((roleExists) => {
        if(!roleExists) {
            return createNewLexServiceRole();
        }
    });
}

function createNewLexServiceRole() {
 
    // Lex service automatically creates the needed polcies and truust relationships   
    const params = {
      AWSServiceName: 'lex.amazonaws.com',
      Description: 'Allows Amazon Lex to create and manage voice enabled bots on your behalf'
    };
    
    return iam.createServiceLinkedRole(params).promise();
    
}

function checkIfLexServiceRoleExists() {
    let rolePresent;
    
    const params = {
        RoleName: "AWSServiceRoleForLexBots"
    };
    
    return iam.getRole(params).promise()
    .then((result) => {
        rolePresent = true;
        return rolePresent;
    })
    .catch((e) => {
        rolePresent = false;
        return rolePresent;
    });
}

function getSlotTypes(newSlotTypeParams, lex){
    const tasks = []; 
    newSlotTypeParams.forEach( slotType => {
        const params = {
            'name': slotType.name,
            'version': '$LATEST'
        };
        tasks.push(
            lex.getSlotType(params).promise()
            .then((data)=>{
                slotType['checksum'] = data.checksum;
            })
            .catch((err)=>{
            })
        ); 
    }); 
    return Promise.all(tasks);
}

function putSlotTypes(newSlotTypeParams, lex){
    const tasks = []; 
    newSlotTypeParams.forEach( slotType => {
        tasks.push(
            lex.putSlotType(slotType).promise()
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            })
        );
    }); 
    return Promise.all(tasks);
}

function getIntents(intentParams, lex){
    const tasks = []; 
    intentParams.forEach( intent => {
        const params = {
            'version': '$LATEST',
            'name': intent.name
        };
        tasks.push(
            lex.getIntent(params).promise()
            .then((data)=>{
                intent['checksum'] = data.checksum;
            })
            .catch((err)=>{
            })
        ); 
    });
    return Promise.all(tasks);
}

function putIntents(intentParams, lex){
    const tasks = []; 
    intentParams.forEach( intent => {
        tasks.push(
            ensureLambdaFunctionAccess(intent)
            .then(()=>{
                delete intent.fulfillmentLambda;
                return lex.putIntent(intent).promise();
            })
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            })
        );
    }); 
    return Promise.all(tasks);
}

function ensureLambdaFunctionAccess(intent){
    if(intent.fulfillmentLambda){
        const { 
            region,
            accountId,
            lambdaArn, 
            lambdaName
        } = intent.fulfillmentLambda;

        const params = {
            FunctionName: lambdaName,
            StatementId: `Lex-${intent.name}`+ "69716767",
            Action: 'lambda:InvokeFunction',
            Principal: 'lex.amazonaws.com',
            SourceArn: `arn:aws:lex:${region}:${accountId}:intent:${intent.name}:*`,
        }

        return lambdaClient.addPermission(params).promise()
                .then((data)=>{
                    console.log(data);
                    return data; 
                })
                .catch((err)=>{
                    console.log(err); 
                    throw err; 
                });
    }else{
        return Promise.resolve(undefined);
    }
}

function getBot(botParams, lex){
    params = {
        'name': botParams.name,
        'versionOrAlias': '$LATEST'
    }; 
    return  lex.getBot(params).promise()
            .then((data)=>{
                botParams['checksum'] = data.checksum;
            })
            .catch((err)=>{
            });
}

function putBot(botParams, lex){
    return lex.putBot(botParams).promise()
            .then((data)=>{
                console.log(data);
                return data; 
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            });
}