// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth"
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { generateNav, getThemeMusic, createFunctionality, addVolumeSliders } from './themes.js';
// import { getUser, addBackButton, addProfileButtonFunc } from './firebase/userEssentials';
// import { getAudioObj, updateSliderVolume, useMusicVolume, addVolSettingsFunc, addVolumeSliders} from './general/audioEssentials';
import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth } from './firebase/userEssentials';

import { onAuthStateChanged, signOut } from "firebase/auth";

import { setCookie, getCookie } from './general/cookies';
// import { displayNotif, closeNotif } from './general/notifs';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

// -------------------------------------

// ********** ESSENTIALS **********
// essentials
addAllNavbarAnimations();
addAllNavbarFunctionality();

// Toasts
// displayToast("Achievement Unlocked", "Great Job!");

// background music
addAudioElementToBody('background-music', getAudioSrc('mute'));

// sound effects
addSoundEffect("btn-sound");

document.getElementById("profile").addEventListener("click", function(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
    
        addProfileButtonFunctionality(user);
      } else {
        addProfileButtonFunctionality(user);
      }
    });
});

// -------------------------------------------------



const levelSelect = document.getElementsByClassName("level-select");
for (let index = 0; index < levelSelect.length; index++) {
    const element = levelSelect[index];
    element.addEventListener('mouseover', function(){
        this.style.borderColor = "white";
    });
    element.addEventListener('mouseout', function(){
        this.style.borderColor = "gray";
    });
    element.addEventListener('click', function(){
        var link = this.getAttribute("data-id");
        console.log(link);
        setTimeout(() => {
            location.href = link+".html";
        }, 300);
    });
}


//add links with button sound effect
// function addButtonFunc(){
//     const buttons = document.getElementsByClassName('menu');

//     Array.from(buttons).forEach(function(element) {
//         element.addEventListener('click', (e) => {
//             const assignedPath = element.id.split("_");
//             const path = assignedPath[0]+"-"+assignedPath[1]+".html";
//             console.log(path);
//             setTimeout(function() {
//                 location.href = path;
//             }, 300);
//         });
//     });
// }
// addButtonFunc();