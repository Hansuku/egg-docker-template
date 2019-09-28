/**
*	The Code By DayiTech FrontEnd
*	Author:Han
*	Created At 2019/09/24 11:28:47
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create role schema
const roleSchema = new Schema({
    id: Number,
    role_name: String,
    nodes: Array
}, {
    collection: 'roles',
});
// release module
mongoose.model('Role', roleSchema);