import { addAllNavbarAnimations, addAllNavbarFunctionality, addProfileButtonFunctionality, displayToast } from './general/essentials';
import { getAudioSrc, addAudioElementToBody, addSoundEffect} from './general/audioEssentials';
import { auth, db, signOutUser } from './firebase/userEssentials';

import { onAuthStateChanged, signOut, multiFactor, getMultiFactorResolver, PhoneAuthProvider, PhoneMultiFactorGenerator, RecaptchaVerifier, reauthenticateWithCredential, EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { Modal, Toast } from 'bootstrap';
import $, { error } from 'jquery';

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import "nes.css/css/nes.min.css";
import "../styles/essentials.css";
import "../styles/profile.css";

import defaultPic from "../assets/images/default_profile_pic.png"

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

// -------------------------------------


// SHOW CONTENT SELECTION
const radioButtons = document.getElementsByClassName('nes-radio');
const contentContainers = document.getElementsByClassName('contentContainer');

//show selected content when radio button option is clicked
for (let index = 0; index < radioButtons.length; index++) {
    const element = radioButtons[index];
    //show currently selected radio option on page load
    // console.log(element, element.checked);
    if(element.checked){
        // console.log("checked");
        if(element.value=="Profile"){
            document.getElementById('contentTitle').innerHTML = "Profile"
            document.getElementById("profile2").style.display = "block";
        }else{
            document.getElementById('contentTitle').innerHTML = element.value;
            document.getElementById(element.value.toLowerCase()).style.display = "block";
        }
    }
    element.addEventListener('click', function(){
        document.getElementById('contentTitle').innerHTML = this.value;
        for (let index = 0; index < contentContainers.length; index++) {
            const element = contentContainers[index];
            element.style.display = "none";
        }
        if(this.value=="Profile"){
            document.getElementById("profile2").style.display = "block";
        }else{
            document.getElementById(this.value.toLowerCase()).style.display = "block";
        }
        
    });
}

//array of badges/themes/backgrounds
const docRef = doc(db, "badgesList", "badges");
const docSnap = await getDoc(docRef);

//get user info
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log(user);

        //2fa
        showRegisteredFactors(user);
    
        const docRefUser = doc(db, "users", user.uid); //USER
        const docSnapUser = await getDoc(docRefUser);

        //display name
        document.getElementById("displayName").innerHTML = docSnapUser.data().username;

        //display points
        document.getElementById("displayPoints").innerHTML = docSnapUser.data().points;

        //display user image
        if(docSnapUser.data().profilePicture!=""){
            document.getElementById("userProfilePic").src = docSnapUser.data().profilePicture;
            document.getElementById("uploadUserProfileImage").src = docSnapUser.data().profilePicture;
        }else{
            document.getElementById("userProfilePic").src = defaultPic;
            document.getElementById("uploadUserProfileImage").src = defaultPic;
        }

        //display email
        document.getElementById("emailInput").value = user.email;

        //display badges
        showBadges(docSnapUser.data().earnedBadges, docSnap.data().badgesArray);
        function showBadges(userBadges, badgesArray){
            console.log("hello")
            var badgesContainer = document.getElementById('badgesContainer');

            if(userBadges == null || userBadges == ""){
                userBadges = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = badgesArray;
            let unlocked = [];
            let locked = [];

            //sort badges
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userBadges.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            let totalEarnedBadges = unlocked.length;
            let totalBadges = arr.length;
            document.getElementById('badgesEarnedProgress').value = totalEarnedBadges;
            document.getElementById('badgesEarnedProgress').max = totalBadges;
            document.getElementById('badgesEarned').innerHTML = totalEarnedBadges+"/"+totalBadges+" Badges Earned";

            //show unlocked badges
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                // var id = element.id;
                var name = element.name;
                var description = element.description;
                var srcPicture = element.srcPicture;
                badgesContainer.innerHTML+=
                `
                <div class="nes-container is-dark" style="background-color: black;height:6rem;padding:0.1rem 0.8rem 0.1rem;display:grid;align-items:center;grid-template-columns: 7% 93%;margin-bottom:1rem;" >
                    <div>
                        <img style="height:5rem;width:5rem" src="`+srcPicture+`">
                    </div>
                    <div style="width:50rem;">
                        <span>`+name+`</span><br>
                        <span style="font-size: small;opacity: 0.9;">`+description+`</span>
                    </div>
                </div>
                `;
            }
            // console.log(locked);
            //show locked badges
            for (let index = 0; index < locked.length; index++) {
                const element = locked[index];
                // var id = element.id;
                var name = element.name;
                var description = element.description;
                var srcPicture = element.srcPicture;
                badgesContainer.innerHTML+=
                `
                <div class="nes-container is-dark" style="background-color: black;height:6rem;padding:0.1rem 0.8rem 0.1rem;display:grid;align-items:center;grid-template-columns: 7% 93%;margin-bottom:1rem;opacity:0.8;" >
                    <div>
                        <img style="height:5rem;width:5rem" src="`+srcPicture+`">
                    </div>
                    <div style="width:50rem;">
                        <span>`+name+`</span><br>
                        <span style="font-size: small;opacity: 0.9;">`+description+`</span>
                    </div>
                </div>
                `;
            }
        }

        //display owned themes + add click event listeners
        showThemes(docSnapUser.data().ownedThemes, docSnap.data().themesArray, docSnapUser.data().theme);
        function showThemes(userThemes, themesArray, selected){
            var themesContainer = document.getElementById('themesContainer');

            if(userThemes == null || userThemes == ""){
                userThemes = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = themesArray;
            let unlocked = [];
            let locked = [];

            //sort themes
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userThemes.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show unlocked themes
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                var id = element.id;
                var name = element.name;
                var srcPicture = element.srcPicture;
                // console.log(selected, id)
                // console.log(selected==id)
                if(selected==id){
                    themesContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title theme-item" data-id="`+id+`" style="background-color: black;height:17rem;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }else{
                    themesContainer.innerHTML+=
                `
                    <div class="nes-container nes-pointer is-dark is-centered with-title theme-item" data-id="`+id+`" style="background-color: black;height:17rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }
                
            }

            var themeItems = document.getElementsByClassName("theme-item")
            for (let index = 0; index < themeItems.length; index++) {
                const element = themeItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");

                    //deselect all
                    for (let index = 0; index < themeItems.length; index++) {
                        const element = themeItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";
                    

                    onAuthStateChanged(auth, async(user) => {
                        if (user) {
                            const ref = doc(db, "users", user.uid); //user
                            await updateDoc(ref, {
                                theme: itemID
                            });
                        }
                    });
                })
            }
        }

        //display owned backgrounds + add click event listeners
        showBackgrounds(docSnapUser.data().ownedBackgrounds, docSnap.data().backgroundsArray, docSnapUser.data().background);
        async function showBackgrounds(userBackgrounds, backgroundsArray, selected){
            var backgroundsContainer = document.getElementById('backgroundsContainer');

            if(userBackgrounds == null || userBackgrounds == ""){
                userBackgrounds = [];
            }

            // console.log("Document data:", docSnap.data());
            var arr = backgroundsArray;
            let unlocked = [];
            let locked = [];

            //sort background
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                if(userBackgrounds.includes(element.id)){
                    unlocked.push(element);
                }else{
                    locked.push(element);
                }
            }

            //show unlocked background
            for (let index = 0; index < unlocked.length; index++) {
                const element = unlocked[index];
                var id = element.id;
                var name = element.name;
                var srcPicture = element.srcPicture;

                if(id==selected){
                    backgroundsContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title background-item" data-id="`+id+`" style="background-color: black;height:17rem;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }else{
                    backgroundsContainer.innerHTML+=
                    `
                    <div class="nes-container nes-pointer is-dark is-centered with-title background-item" data-id="`+id+`" style="background-color: black;height:17rem;border-color:gray;">
                        <p class="title" style="background-color: black;">`+name+`</p>
                        <img src="`+srcPicture+`" style="width:100%;">
                    </div>
                    `;
                }
                
            }

            var backgroundItems = document.getElementsByClassName("background-item")
            for (let index = 0; index < backgroundItems.length; index++) {
                const element = backgroundItems[index];
                element.addEventListener('click', function(){
                    //item id
                    let itemID = this.getAttribute("data-id");

                    //deselect all
                    for (let index = 0; index < backgroundItems.length; index++) {
                        const element = backgroundItems[index];
                        element.style.borderColor = "gray";
                    }

                    //select item
                    this.style.borderColor = "white";

                    //update UI
                    displayBackground(itemID);

                    onAuthStateChanged(auth, async(user) => {
                        if (true) {
                            const ref = doc(db, "users", user.uid); //user
                            await updateDoc(ref, {
                                background: itemID
                            });
                        }
                    });
                })
            }
        }

        //display background behind user avatar
        displayBackground(docSnapUser.data().background);
        function displayBackground(background){
            if(background==""||background==null){
                return
            }
            let backgroundsArr = docSnap.data().backgroundsArray;
            for (let index = 0; index < backgroundsArr.length; index++) {
                const element = backgroundsArr[index];
                if(element.id == background){
                    document.getElementById("userBackground").style.backgroundColor = "rgb("+element.rgb+")";
                }
            }
            
        }

        //show reports
        let prog1 = docSnapUser.data().completedLevels1.length
        document.getElementById("progress1").value = prog1;
        document.getElementById("progress1text").innerHTML = "Flowcharts & Pseudocode: "+prog1+"/30";
        let prog2 = docSnapUser.data().completedLevels2.length
        document.getElementById("progress2").value = prog2;
        document.getElementById("progress2text").innerHTML = "Basic Syntax: "+prog2+"/30";
        let prog3 = docSnapUser.data().completedLevels3.length
        document.getElementById("progress3").value = prog3;
        document.getElementById("progress2text").innerHTML = "Variables: "+prog3+"/30";
        let prog4 = docSnapUser.data().completedLevels4.length
        document.getElementById("progress4").value = prog4;
        document.getElementById("progress2text").innerHTML = "Data Types: "+prog4+"/30";
        let prog5 = docSnapUser.data().completedLevels5.length
        document.getElementById("progress5").value = prog5;
        document.getElementById("progress2text").innerHTML = "Operators: "+prog5+"/30";
        let prog6 = docSnapUser.data().completedLevels6.length
        document.getElementById("progress6").value = prog6;
        document.getElementById("progress2text").innerHTML = "Conditional Statements: "+prog6+"/30";
        let prog7 = docSnapUser.data().completedLevels7.length
        document.getElementById("progress7").value = prog7;
        document.getElementById("progress2text").innerHTML = "Loops: "+prog7+"/30";
        let prog8 = docSnapUser.data().completedLevels8.length
        document.getElementById("progress8").value = prog8;
        document.getElementById("progress2text").innerHTML = "Methods: "+prog8+"/30";
        let prog9 = docSnapUser.data().completedLevels9.length
        document.getElementById("progress9").value = prog9;
        document.getElementById("progress2text").innerHTML = "Arrays: "+prog9+"/30";
        let prog10 = docSnapUser.data().completedLevels10.length
        document.getElementById("progress10").value = prog10;
        document.getElementById("progress2text").innerHTML = "String Manipulation: "+prog10+"/30";

        let overallProg = prog1 + prog2 + prog3 + prog4 + prog5 + prog6 + prog7 + prog8 + prog9 + prog10;
        document.getElementById("levelsCompletedProgress").value = overallProg;
        document.getElementById("levelsCompleted").innerHTML = overallProg + "/100 Levels Completed"

        let historyArray = docSnapUser.data().history;
        //show newest first
        historyArray.reverse();

        let historyContainer = document.getElementById("historyContainer");
        for (let index = 0; index < historyArray.length; index++) {
            const element = historyArray[index];

            let timestamp = element.dateTime;
            let date = timestamp.toDate();
            let dateFormat = date.getHours() + ":" + ("0"+date.getMinutes()).slice(-2) + " "+ date.toDateString();

            let description = element.description;
            historyContainer.innerHTML +=
            `
            <div class="nes-container is-dark" style="background-color: #121212;width:80rem;display:grid;grid-template-columns: 30% 70%;">
                <span>`+dateFormat+`</span>
                <span>`+description+`</span>
            </div>
            `;
        }

    }
});

// UPLOAD PROFILE PIC
document.getElementById("uploadUserProfilePicture").addEventListener('change', async function() {
    if(this.files[0].size > 2097152){
        displayToast("File size too big", "Image must be < 2MB");
        return;
    }else{
        document.getElementById("uploadUserProfileImage").src = URL.createObjectURL(this.files[0]);
    }
});

// SAVE PROFILE
document.getElementById("saveProfile").addEventListener("click", function(){
    onAuthStateChanged(auth, (user) => {
        if (user) {
            var username = document.getElementById("nameInput").value;

            updateUser(user.uid, username);
        }
    });
});

async function updateUser(userID, username){
    let imageElement = document.getElementById("uploadUserProfilePicture");
    if(imageElement.value != "" && imageElement != null){        
        if (imageElement.files && imageElement.files[0]) {
            // let filename = makeid(10);
            const storage = getStorage();
            const storageRef = ref(storage, "user-images/"+userID+"/"+userID);
    
            const UploadTask = uploadBytesResumable(storageRef, imageElement.files[0]);
            UploadTask.on('state-changed', (snapshot)=>{},
                (error) =>{
                    console.log(error);
                    displayToast("Error Uploading Image", "Please try again")
                },
                ()=>{
                    getDownloadURL(UploadTask.snapshot.ref).then( async (downloadURL)=>{
                        // console.log(downloadURL);
                        document.getElementById("userProfilePic").src = downloadURL;
                        const userRef = doc(db, "users", userID);
                        await updateDoc(userRef, {
                            profilePicture: downloadURL,
                            username: username
                        }).then(function() {
                            displayToast("Success","Profile Updated")
            
                        });
                    });
                }
            );
        }
    }else{
        const userRef = doc(db, "users", userID);
        await updateDoc(userRef, {
            username: username
        }).then(function() {
            displayToast("Success","Profile Updated")
            
        });
    }
}

// logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", (e) =>{
    signOutUser();
});

//show registered 2FA factors (phone numbers)
function showRegisteredFactors(user){
    const mfaUser = multiFactor(user);
    const enrolledFactors = mfaUser.enrolledFactors;
    const enrolledFactorsContainer = document.getElementById("enrolledFactorsContainer");
    enrolledFactorsContainer.innerHTML = "";
    for (let index = 0; index < enrolledFactors.length; index++) {
        const element = enrolledFactors[index];

        const displayName = element.displayName;
        const phoneNumber = hideCharacters(element.phoneNumber); // makes it into +63********03
        
        enrolledFactorsContainer.innerHTML +=
        `
        <div style="position: relative;display:flex;align-items: center; height:3rem;overflow:hidden;margin-bottom:3rem;">
            <span><i class="nes-smartphone" style="transform: scale(0.3);"></i></span>
            <span style="margin-right: 1rem;width:16rem;">`+displayName+`</span>
            <span style="margin-right: 2rem;">`+phoneNumber+`</span>
            <span style="margin-top: 0.3rem;"><i class="nes-icon close is-small nes-pointer removeFactor" data-id="`+index+`"></i></span>
        </div>
        `
    }

    let removeFactor = document.getElementsByClassName("removeFactor");

    for (let index = 0; index < removeFactor.length; index++) {
        const element = removeFactor[index];
        element.addEventListener('click', function(){
            showRemove2ndFactorModal(element.getAttribute("data-id"));
        })
    }
}

function hideCharacters(str) {
    if (str.length <= 4) {
      // If the string has 4 or fewer characters, return it as is
      return str;
    } else {
      // Replace characters in between first and last two characters with asterisks
      const firstThreeChars = str.slice(0, 3);
      const lastTwoChars = str.slice(-2);
      const middleAsterisks = "*".repeat(str.length - 4);
      return firstThreeChars + middleAsterisks + lastTwoChars;
    }
}

let remove2ndFactorModal = new Modal(document.getElementById("remove2ndFactorModal"));
//cancel button
document.getElementById("remove2ndFactorCancel").addEventListener("click", function(){
    remove2ndFactorModal.toggle();
})

function showRemove2ndFactorModal(dataID){
    remove2ndFactorModal.toggle();

    recreateElement("remove2ndFactorConfirm");
    let remove2ndFactorConfirm = document.getElementById("remove2ndFactorConfirm");
    remove2ndFactorConfirm.addEventListener("click", function(){
        removeSecondFactor(dataID);
    });
}

// Unenroll/remove a second factor
function removeSecondFactor(selectedIndex){
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const multiFactorUser = multiFactor(user);
            const options = multiFactorUser.enrolledFactors
            // Ask user to select from the enrolled options.
            return multiFactorUser.unenroll(options[selectedIndex])
            .then(() =>{
                remove2ndFactorModal.toggle();
                displayToast("Success","2FA Factor Removed");
                showRegisteredFactors(user);
            }).catch( async (error) => {
                var errorCode = error.code
                if(errorCode == "auth/requires-recent-login"){
                    let reAuthModal = new Modal(document.getElementById("reAuthModal"));
                    let credential;
    
                    if (user.providerData.some((provider) => provider.providerId === EmailAuthProvider.PROVIDER_ID)) {
                        // Used Email and Password
    
                        reAuthModal.toggle();
                        document.getElementById("reAuthBtn").addEventListener("click", function(){
                            let email = document.getElementById("reAuthEmail").value;
                            let pass = document.getElementById("reAuthPass").value;
                            credential = EmailAuthProvider.credential(email, pass);
                            reauthenticateWithCredential(user, credential).then(() => {
                                displayToast("Success","User Re-authenticated");
                                reAuthModal.toggle();
                                
                            }).catch((error) => {
                                reAuthModal.toggle();
    
                                var errorCode = error.code;
                                if (errorCode == 'auth/multi-factor-auth-required') {
                                    
                                    multiFactorAuthHandler(error);
    
                                }else{
                                    displayToast("Auth Error","Incorrect Credentials");
                                }
                            });
                        });
                        
                    } else if (user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID)) {
                        // Used Google Login
    
                        const googleProvider = new GoogleAuthProvider();
                        
                        credential = await signInWithPopup(auth, googleProvider);
                        reauthenticateWithCredential(user, credential).then(() => {
                            displayToast("Success","User Re-authenticated");
                            reAuthModal.toggle();
                        }).catch((error) => {
                            reAuthModal.toggle();
    
                            var errorCode = error.code;
                            if (errorCode == 'auth/multi-factor-auth-required') {
                                
                                multiFactorAuthHandler(error);
    
                            }else{
                                displayToast("Auth Error","Incorrect Credentials");
                            }
                            
                        });
                    } else {
                        // Handle other provider types or show an error message
                        console.error("Unsupported provider for re-authentication.");
                        return;
                    }
    
                }else{
                    console.log(error);
                }
            });
        }
    });
}

//show 2fa Modal
let twofaModal = new Modal(document.getElementById("2faModal"));
let otpModal = new Modal(document.getElementById("otpModal"));
document.getElementById("2faButton").addEventListener('click', function(){
    document.getElementById("phoneNum").value = "";
    twofaModal.toggle();
});

document.getElementById("sendSMS").addEventListener('click', function(){
    //recreate the element to get fresh captcha
    document.getElementById("recaptcha-container").innerHTML="";
    recreateElement("recaptcha-container");

    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log(response)
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        }
    }, auth);

    onAuthStateChanged(auth,(user) => {
        multiFactor(user).getSession().then(function (multiFactorSession) {
            // Specify the phone number and pass the MFA session.
            let phoneNumber = "+63" + document.getElementById("phoneNum").value;
            const phoneInfoOptions = {
                phoneNumber: phoneNumber,
                session: multiFactorSession
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);

            // Send SMS verification code.
            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)

        }).then(function (verificationId) {
            //toast
            displayToast('Success','OTP Sent')
            twofaModal.toggle();

            //clear input
            document.getElementById("otpInput").value = "";
            document.getElementById("phoneName").value = "";

            otpModal.toggle();

            //clear all event listeners
            var old_element = document.getElementById("optConfirmBtn");
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);

            recreateElement("otpInput");
            document.getElementById("otpInput").addEventListener("keydown", function(){
                document.getElementById("is-error-feedback-otp").innerHTML = "";
                document.getElementById("is-error-feedback-otp").style.display = "none";

                document.getElementById("otpInput").classList.add("is-dark");
                document.getElementById("otpInput").classList.remove("is-error");
                document.getElementById("otpInput").style.backgroundColor = "";
                document.getElementById("otpInput").style.color = "";
            });

            recreateElement("optConfirmBtn");

            recreateElement("phoneName");
            document.getElementById("phoneName").addEventListener("keydown", function(){
                document.getElementById("phoneName").classList.add("is-dark");
                document.getElementById("phoneName").classList.remove("is-error");
                document.getElementById("phoneName").style.backgroundColor = "";
                document.getElementById("phoneName").style.color = "";
            });

            document.getElementById("optConfirmBtn").addEventListener("click", function(){
                // Ask user for the verification code. Then:
                let verificationCode = document.getElementById("otpInput").value;
                const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                
                let phoneName = document.getElementById("phoneName").value;
                if (phoneName == "" || phoneName == null) {
                    document.getElementById("phoneName").classList.remove("is-dark");
                    document.getElementById("phoneName").classList.add("is-error");
                    document.getElementById("phoneName").style.backgroundColor = "black";
                    document.getElementById("phoneName").style.color = "white";
                    return
                }

                // Complete enrollment.
                return multiFactor(user).enroll(multiFactorAssertion, phoneName)
                .then(function () {
                    otpModal.toggle();
                    displayToast("Success","Phone Registered");
                    showRegisteredFactors(user);
                }).catch((error) => {
                    if(error.code == 'auth/invalid-verification-code'){
                        //responsive styling for invalid input
                        document.getElementById("otpInput").classList.remove("is-dark");
                        document.getElementById("otpInput").classList.add("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "black";
                        document.getElementById("otpInput").style.color = "white";

                        //show error message
                        document.getElementById("is-error-feedback-otp").innerHTML = "Invalid Verification Code";
                        document.getElementById("is-error-feedback-otp").style.display = "block";

                    }else if(error.code == 'auth/code-expired'){
                        //responsive styling for invalid input
                        document.getElementById("otpInput").classList.remove("is-dark");
                        document.getElementById("otpInput").classList.add("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "black";
                        document.getElementById("otpInput").style.color = "white";

                        //show error message
                        document.getElementById("is-error-feedback-otp").innerHTML = "Verification Code Expired";
                        document.getElementById("is-error-feedback-otp").style.display = "block";

                        
                        displayToast("Error", "Expired OTP");
                        //hide modal to restart process
                        otpModal.toggle();

                        //reset styling
                        document.getElementById("is-error-feedback-otp").innerHTML = "";
                        document.getElementById("is-error-feedback-otp").style.display = "none";

                        document.getElementById("otpInput").classList.add("is-dark");
                        document.getElementById("otpInput").classList.remove("is-error");
                        document.getElementById("otpInput").style.backgroundColor = "";
                        document.getElementById("otpInput").style.color = "";
                    };
                });
            });

            
        }).catch(async (error) => {
            var errorCode = error.code
            if(errorCode == "auth/requires-recent-login"){
                let reAuthModal = new Modal(document.getElementById("reAuthModal"));
                let credential;

                if (user.providerData.some((provider) => provider.providerId === EmailAuthProvider.PROVIDER_ID)) {
                    // Used Email and Password

                    reAuthModal.toggle();
                    document.getElementById("reAuthBtn").addEventListener("click", function(){
                        let email = document.getElementById("reAuthEmail").value;
                        let pass = document.getElementById("reAuthPass").value;
                        credential = EmailAuthProvider.credential(email, pass);
                        reauthenticateWithCredential(user, credential).then(() => {
                            displayToast("Success","User Re-authenticated");
                            reAuthModal.toggle();
                            
                        }).catch((error) => {
                            reAuthModal.toggle();

                            var errorCode = error.code;
                            if (errorCode == 'auth/multi-factor-auth-required') {
                                
                                multiFactorAuthHandler(error);

                            }else{
                                displayToast("Auth Error","Incorrect Credentials");
                            }
                        });
                    });
                    
                } else if (user.providerData.some((provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID)) {
                    // Used Google Login

                    const googleProvider = new GoogleAuthProvider();
                    
                    credential = await signInWithPopup(auth, googleProvider);
                    reauthenticateWithCredential(user, credential).then(() => {
                        displayToast("Success","User Re-authenticated");
                        reAuthModal.toggle();
                    }).catch((error) => {
                        reAuthModal.toggle();

                        var errorCode = error.code;
                        if (errorCode == 'auth/multi-factor-auth-required') {
                            
                            multiFactorAuthHandler(error);

                        }else{
                            displayToast("Auth Error","Incorrect Credentials");
                        }
                        
                    });
                } else {
                    // Handle other provider types or show an error message
                    console.error("Unsupported provider for re-authentication.");
                    return;
                }

            }else if(errorCode == "auth/second-factor-already-in-use"){
                twofaModal.toggle();
                displayToast("Sorry","Number already in use");

            }else if(errorCode == "auth/invalid-phone-number"){
                twofaModal.toggle();
                displayToast("Sorry","Invalid Phone Number");
            }
            else{
                console.log(error);
            }
        });
    })
});

function multiFactorAuthHandler(error){
    //recreate the element to get fresh captcha
    document.getElementById("recaptcha-container").innerHTML="";
    recreateElement("recaptcha-container");

    //initialize captchaVerifier
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
             // console.log(response)
             // reCAPTCHA solved, allow signInWithPhoneNumber.
             // ...
        },
         'expired-callback': () => {
             // Response expired. Ask user to solve reCAPTCHA again.
             // ...
        }
    }, auth);

    //show all registered Factors to choose from
    const resolver = getMultiFactorResolver(auth, error);
    //populate select element with options
    document.getElementById("2faSelect").innerHTML = `<option value="" disabled selected hidden>Select an option</option>`;
    for (let index = 0; index < resolver.hints.length; index++) {
        const element = resolver.hints[index];
 
        document.getElementById("2faSelect").innerHTML+=
        `
        <option value="`+index+`">`+element.displayName+` (`+element.phoneNumber+`)</option>
        `
    }

    //show 2faModal (choose factor)
    let twofaModal = new Modal(document.getElementById("2faModalReAuth"));
    twofaModal.toggle();

    //recreate element to remove all eventListeners (in case of multiple tries)
    recreateElement("2faSelect");
    //responsive styling for input validation
    document.getElementById("2faSelect").addEventListener("change", function(){
        document.getElementById("2faSelectContainer").classList.remove("is-error");
        document.getElementById("2faSelectContainer").classList.add("is-dark");
        document.getElementById("2faSelect").style.backgroundColor = "";
        document.getElementById("2faSelect").style.color = "";
    })
    
    //recreate element to remove all eventListeners (in case of multiple tries)
    recreateElement("2faContinueBtn");
    //responsive styling for input validation
    document.getElementById("2faContinueBtn").addEventListener("click", function(){
        let option = document.getElementById("2faSelect");
        //do not allow when no option is selected
        if(option.value==""){
            document.getElementById("2faSelectContainer").classList.add("is-error");
            document.getElementById("2faSelectContainer").classList.remove("is-dark");
            document.getElementById("2faSelect").style.backgroundColor = "black";
            document.getElementById("2faSelect").style.color = "white";
            return
        }
         
        //double check if an option is selected
        if (resolver.hints[option.value].factorId === PhoneMultiFactorGenerator.FACTOR_ID){
            const phoneInfoOptions = {
                multiFactorHint: resolver.hints[option.value],
                session: resolver.session
            };

            const phoneAuthProvider = new PhoneAuthProvider(auth);
            // Send SMS verification code
            return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier)
            .then(function (verificationId) {
                //hide first modal after SMS has been sent
                twofaModal.toggle();

                //clear text input in new modal
                document.getElementById("otpReAuthInput").value = "";

                //show new modal for OTP input
                let otpModal = new Modal(document.getElementById("otpModalReAuth"));
                otpModal.toggle();

                //hide invalid error display
                document.getElementById("is-error-feedback").style.display = "none";

                //recreate element to remove all eventListeners (in case of multiple tries)
                recreateElement("otpReAuthInput");
                //hide error message on change
                document.getElementById("otpReAuthInput").addEventListener("keydown", function(){
                    document.getElementById("is-error-feedback").innerHTML = "";
                    document.getElementById("is-error-feedback").style.display = "none";

                    document.getElementById("otpReAuthInput").classList.add("is-dark");
                    document.getElementById("otpReAuthInput").classList.remove("is-error");
                    document.getElementById("otpReAuthInput").style.backgroundColor = "";
                    document.getElementById("otpReAuthInput").style.color = "";
                });

                //recreate element to remove all eventListeners (in case of multiple tries)
                recreateElement("otpConfirmReAuthBtn");
                
                //confirm button
                document.getElementById("otpConfirmReAuthBtn").addEventListener("click", function(){
                    // Ask user for the SMS verification code. Then:
                    let verificationCode = document.getElementById("otpReAuthInput").value;
                    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                    // Complete sign-in.
                    return resolver.resolveSignIn(multiFactorAssertion).then(function(){
                        otpModal.toggle();
                        displayToast("Login Success", "User Re-authenticated");
                        
                    }).catch((error) => {
                        if(error.code == 'auth/invalid-verification-code'){
                            //responsive styling for invalid input
                            document.getElementById("otpReAuthInput").classList.remove("is-dark");
                            document.getElementById("otpReAuthInput").classList.add("is-error");
                            document.getElementById("otpReAuthInput").style.backgroundColor = "black";
                            document.getElementById("otpReAuthInput").style.color = "white";

                            //show error message
                            document.getElementById("is-error-feedback").innerHTML = "Invalid Verification Code";
                            document.getElementById("is-error-feedback").style.display = "block";

                        }else if(error.code == 'auth/code-expired'){
                            //responsive styling for invalid input
                            document.getElementById("otpReAuthInput").classList.remove("is-dark");
                            document.getElementById("otpReAuthInput").classList.add("is-error");
                            document.getElementById("otpReAuthInput").style.backgroundColor = "black";
                            document.getElementById("otpReAuthInput").style.color = "white";

                            //show error message
                            document.getElementById("is-error-feedback").innerHTML = "Verification Code Expired";
                            document.getElementById("is-error-feedback").style.display = "block";

                            
                            displayToast("Error", "Expired OTP");
                            //hide modal to restart process
                            otpModal.toggle();
                        };
                    });
                });
            });

        } else {
            // Unsupported second factor.
            displayToast("Error","Unsupported Factor")
        }
    });
}

function recreateElement(elementID){
    var old_element = document.getElementById(elementID);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

// item shop button
document.getElementById("itemShopButton").addEventListener('click', function(){
    setTimeout(() => {
        location.href = "shop.html";
    }, 300);
});