import Vue from "vue";
const AgoraRTM = require("agora-rtm-sdk");
const client = AgoraRTM.createInstance("96068bd6cd894b2f9fa6f8d8c24289ed");

Vue.chat = client;
