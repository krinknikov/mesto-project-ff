(()=>{"use strict";var e=document.querySelector("#card-template").content,t=function(t){var n=t.userId,r=t.cardElementInfo,o=t.confirmDeleteCard,a=t.addLike,c=t.openModalImage,i=e.querySelector(".places__item").cloneNode(!0),u=i.querySelector(".card__image"),l=i.querySelector(".card__delete-button"),s=i.querySelector(".card__like-button"),d=i.querySelector(".card__counter-like");return i.id=r._id,i.querySelector(".card__title").textContent=r.name,u.src=r.link,u.alt=r.name,d.textContent=r.likes.length,r.likes.some((function(e){return e._id===n}))&&s.classList.add("card__like-button_is-active"),r.owner._id===n?l.addEventListener("click",(function(e){o(r._id)})):l.remove(),s.addEventListener("click",(function(e){a(e,r._id,d)})),u.addEventListener("click",(function(){c(r.name,r.link)})),i};function n(e){e.classList.add("popup_is-opened"),document.body.style.overflow="hidden",document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.body.style.overflow="",document.removeEventListener("keydown",o)}function o(e){"Escape"===e.code&&r(document.querySelector(".popup_is-opened"))}var a,c=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},i=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled",!1)):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},u=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.textContent="",i(n,r,t.inactiveButtonClass),n.forEach((function(n){c(e,n,t.inputErrorClass,t.errorClass),n.setCustomValidity(""),n.classList.remove(t.inputErrorClass)}))},l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"3287f975-8c11-4d03-b1cb-91ae6a2076d2","Content-Type":"application/json"}},s=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".content").querySelector(".places__list"),f=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__image"),y=document.querySelector(".popup_type_avatar"),v=(document.querySelectorAll(".popup__content"),document.querySelectorAll(".popup")),h=document.querySelector(".popup_type_edit"),b=h.querySelector(".popup__form"),S=b.querySelector(".popup__input_type_name"),C=b.querySelector(".popup__input_type_description"),g=document.querySelector(".popup_type_new-card"),q=g.querySelector(".popup__form"),E=q.querySelector(".popup__input_type_card-name"),L=q.querySelector(".popup__input_type_url"),k=document.querySelector(".popup_type_image"),A=document.querySelector(".popup__image"),x=document.querySelector(".popup__caption"),I=document.querySelector(".profile__edit-button"),U=document.querySelector(".profile__add-button"),w=document.forms["edit-profile"],B=document.forms["edit-avatar"],D=document.querySelector(".popup_type_alert"),M=D.querySelector(".popup__button-alert"),T=function(e,t){e?t.textContent="Сохранение...":(t.textContent="Сохранение",t.classList.add(V.inactiveButtonClass),t.setAttribute("disabled",!0))};q.addEventListener("submit",(function(e){e.preventDefault();var n,o=e.submitter;T(!0,o),(n={name:E.value,link:L.value},fetch("".concat(l.baseUrl,"/cards"),{method:"POST",headers:l.headers,body:JSON.stringify(n)}).then(s)).then((function(e){var n=t({userId:a,cardElementInfo:e,confirmDeleteCard:O,addLike:j,openModalImage:P});p.prepend(n),q.reset(),r(g)})).catch((function(e){console.log("ошибка добавления карточки:",e)})).finally((function(){T(!1,o)}))}));var j=function(e,t,n){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(t).then((function(t){e.target.classList.remove("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.log("ошибка удаления лайка:",e)})):function(e){return fetch("".concat(l.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:l.headers}).then(s)}(t).then((function(t){e.target.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){console.log("ошибка добавления лайка:",e)}))},O=function(e){n(D),D.dataset.cardId=e},P=function(e,t){A.src=t,A.alt=e,x.textContent=e,n(k)};b.addEventListener("submit",(function(e){e.preventDefault();var t,n=e.submitter;T(!0,n),(t={name:w.name.value,about:w.description.value},fetch("".concat(l.baseUrl,"/users/me"),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t.name,about:t.about})}).then(s)).then((function(e){f.textContent=e.name,m.textContent=e.about,r(h)})).catch((function(e){console.log("ошибка изменения данных пользователя:",e)})).finally((function(){T(!1,n)}))})),I.addEventListener("click",(function(){S.value=f.textContent,C.value=m.textContent,n(h),u(b,V)})),U.addEventListener("click",(function(){q.reset(),n(g),u(q,V)})),_.addEventListener("click",(function(){B.reset(),u(B,V),n(y)})),M.addEventListener("click",(function(){var e;(e=D.dataset.cardId,fetch("".concat(l.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:l.headers}).then(s)).then((function(e){console.log(e),document.getElementById(D.dataset.cardId).remove(),r(D)})).catch((function(e){console.log("ошибка удаления карточки:",e)}))})),B.addEventListener("submit",(function(e){e.preventDefault();var t,n=e.submitter;T(!0,n),(t={link:B.link.value},fetch("".concat(l.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:t.link})}).then(s)).then((function(e){_.style.backgroundImage="url(".concat(e.avatar,")"),r(y)})).catch((function(e){console.log("ошибка добавления аватара:",e)})).finally((function(){T(!1,n)}))})),Promise.all([fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then(s)]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],i=o[1];f.textContent=i.name,m.textContent=i.about,_.style.backgroundImage="url(".concat(i.avatar,")"),a=i._id,c.forEach((function(e){var n=t({userId:a,cardElementInfo:e,confirmDeleteCard:O,addLike:j,openModalImage:P});p.append(n)}))})).catch((function(e){console.log("ошибка передачи карточки:",e)})),v.forEach((function(e){e.addEventListener("click",(function(t){(t.target===e||t.target.classList.contains("popup__close"))&&r(document.querySelector(".popup_is-opened"))}))}));var V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",errorVisible:".popup__error_visible",inputErrorVisible:".popup__input_type_error",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),t.validity.valueMissing?o.textContent="Вы пропустили это поле":o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),i(n,r,t)}))}))}(t,e)}))}(V)})();