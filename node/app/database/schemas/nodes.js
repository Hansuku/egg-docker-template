/**
*	The Code By DayiTech FrontEnd
*	Author:Han
*	Created At 2019/09/24 11:32:34
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create role schema
const nodeSchema = new Schema({
    id: {type: Number, ref: 'Role'},
    icon: String,
    name: String,
    node_file_name: String,
    node_name: String,
    node_url: String,
    parent_id: Number,
    type: Number,
    node_api: String
}, {
    collection: 'nodes',
});
// release module
mongoose.model('Node', nodeSchema);