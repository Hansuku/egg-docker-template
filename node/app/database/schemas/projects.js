/**
*	The Code By DayiTech FrontEnd
*	Author:Han
*	Created At 2019/09/24 11:24:13
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

// create project schema
const projectSchema = new Schema({
    id: Number,
    project_name: String,
    release_auth: Array,
    test_auth: Array
}, {
    collection: 'projects',
});
// release module
mongoose.model('Project', projectSchema);