"use strict"

import { topics } from './topics.js';

const chatContentsElement = document.getElementById('chat_contents');
const cursorElement = document.getElementById('cursor');
const startBtnElement = document.getElementById('start_button');
const prevBtnElement = document.getElementById('prev_button');
const nextBtnElement = document.getElementById('next_button');

let i = 0;
let typingInProgress = false;

/**
 * 配列内の要素をシャッフル
 *
 * @param {string} topics
 *
 * @returns {void}
 */
const shuffle = topics => topics.sort(() => Math.random() - 0.5);

/**
 * 文字を1文字ずつ入力
 *
 * @param {string} chatContent
 * @param {number} strIndex
 *
 * @returns {void}
 */
const typeText = (chatContent, strIndex) => {
    if (strIndex >= chatContent.length) {
        cursorElement.style.animation = 'blink 0.8s step-end infinite';
        typingInProgress = false;
        return;
    }

    typingInProgress = true;
    cursorElement.style.animation = 'none';
    chatContentsElement.textContent += chatContent.charAt(strIndex);
    strIndex++;
    setTimeout(() => typeText(chatContent, strIndex), 25);
}

const updateProgressBar = () => {
    const progressBarElement = document.getElementById('progress_bar');
    const progressPer = ((i + 1) / topicList.length) * 100;

    progressBarElement.style.width = `${progressPer}%`;
}

const topicList = shuffle(topics);

startBtnElement.addEventListener('click', () => {
    if (typingInProgress) {
        return;
    }

    const chatContent = topicList[0];
    updateProgressBar();
    setTimeout(() => typeText(chatContent, 0), 300);

    startBtnElement.style.visibility = 'hidden';
    nextBtnElement.style.visibility = 'visible';
});

nextBtnElement.addEventListener('click', () => {
    if (typingInProgress) {
        return;
    }

    i++;
    chatContentsElement.textContent = '';
    const chatContent = topicList[i];
    updateProgressBar();
    setTimeout(() => typeText(chatContent, 0), 300);

    if (i === 1) {
        prevBtnElement.style.visibility = 'visible';
    }

    if (i === topicList.length - 1) {
        nextBtnElement.style.visibility = 'hidden';
    }
});

prevBtnElement.addEventListener('click', () => {
    if (typingInProgress) {
        return;
    }

    i--;
    chatContentsElement.textContent = '';
    const chatContent = topicList[i];
    updateProgressBar();
    setTimeout(() => typeText(chatContent, 0), 300);

    if (i === 0) {
        prevBtnElement.style.visibility = 'hidden';
    }

    if (i === topicList.length - 2) {
        nextBtnElement.style.visibility = 'visible';
    }
});
