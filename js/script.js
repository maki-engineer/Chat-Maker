"use strict"

import { topics } from './topics.js';

const chatContentsElement = document.getElementById('chat_contents');
const startBtnElement = document.getElementById('start_button');
const prevBtnElement = document.getElementById('prev_button');
const nextBtnElement = document.getElementById('next_button');

const shuffle = topics => topics.sort(() => Math.random() - 0.5);

const topicList = shuffle(topics);

let i = 0;

startBtnElement.addEventListener('click', () => {
    chatContentsElement.textContent = topicList[0];

    startBtnElement.style.visibility = 'hidden';
    nextBtnElement.style.visibility = 'visible';
});

nextBtnElement.addEventListener('click', () => {
    i++;
    chatContentsElement.textContent = topicList[i];

    if (i === 1) {
        prevBtnElement.style.visibility = 'visible';
    }

    if (i === topicList.length - 1) {
        nextBtnElement.style.visibility = 'hidden';
    }
});

prevBtnElement.addEventListener('click', () => {
    i--;
    chatContentsElement.textContent = topicList[i];

    if (i === 0) {
        prevBtnElement.style.visibility = 'hidden';
    }

    if (i === topicList.length - 2) {
        nextBtnElement.style.visibility = 'visible';
    }
});
