import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, loginWithGoogle, loginWithEmailAndPassword, createDefaultGoogleUser } from './firebase/userEssentials';

import { onAuthStateChanged } from 'firebase/auth';

import { Modal, Toast } from 'bootstrap';
import $ from 'jquery';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/login.css";

//eye icon image sources
import eye_icon_default from "../assets/images/eye_icon.png";
import eye_icon_hide from "../assets/images/eye_icon_hide.png";

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

// ********** ********** **********

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
        if(!element.disabled){
            setTimeout(() => {
                location.href = link+".html";
            }, 300);
        }
    });
}