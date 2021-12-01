const { Node } = require('./node/node')
const { Services } = require('./services/services')
const { Memberships } = require('./memberships/memberships')
const { Call_Set } = require('./call_set/call_set')
const { Sunday_Call_Set } = require('./sunday_call_set/sunday_call_set')
const { Call_Schedular } = require('./scheduler/call_scheduler')
const { Sunday_Call_Schedular } = require('./scheduler/sunday_call_scheduler')
const { User } = require('../models/user/user')
const { About_Us } = require('./about_us/about_us')
const { Contact_Us_Mail } = require('./contact_us_mail/contact_us_mail')
const { Contact_Us_Content } = require('./contact_us_content/contact_us_content')
const { Home } = require('./home/home')
const { Free_Trial_Request } = require('./free_trial_request/free_trial_request')

module.exports = {
    'users': 'db_users',
    'nodes': Node,
    'users': User,
    'services': Services,
    'about_us': About_Us,
    'home': Home,
    'free_trial_request': Free_Trial_Request,
    'contact_us_mail': Contact_Us_Mail,
    'contact_us_content' : Contact_Us_Content,
    'memberships': Memberships,
    'call_sets': Call_Set,
    'sunday_call_sets': Sunday_Call_Set,
    'sunday_call_schedular': Sunday_Call_Schedular,
    'call_schedular': Call_Schedular
}