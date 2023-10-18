"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6349],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/user/UserInfoModal/UserInfoModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useModal.ts"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.tsx"),_components_user_UserInfoModal_UserInfoModal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/user/UserInfoModal/UserInfoModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"user/UserInfoModal",component:_components_user_UserInfoModal_UserInfoModal__WEBPACK_IMPORTED_MODULE_2__.Z,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_0__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_user_UserInfoModal_UserInfoModal__WEBPACK_IMPORTED_MODULE_2__.Z,{onServiceCenterButtonClick:()=>alert("고객문의")})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{onServiceCenterButtonClick:()=>alert("고객문의")}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    onServiceCenterButtonClick: () => alert('고객문의')\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/apis/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CS:()=>fetchUserInfo,NJ:()=>modifyUserInfo,xU:()=>deleteUserAccount});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchUserInfo=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get("/api/me"),modifyUserInfo=body=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.patch("/api/me",body),deleteUserAccount=()=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.delete("/api/me/account")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.iv`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.iv`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `}};

  ${props=>props.css}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Input_Input});const InputWrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.input`
  width: ${({width})=>width};
  height: ${({height})=>height};
  padding: 6px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};

  font-size: 14px;

  && {
    ${props=>props.css}
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react.forwardRef)(((props,ref)=>{const{width,height,css,...rest}=props;return(0,jsx_runtime.jsx)(InputWrapper,{width,height,css,ref,...rest})}));Input.displayName="Input";const Input_Input=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/common/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    font-weight: bold;
  }
  h1& {
    font-size: 36px;
  }
  h2& {
    font-size: 32px;
  }
  h3& {
    font-size: 28px;
  }
  h4& {
    font-size: 24px;
  }
  p&,
  span&,
  strong&,
  small& {
    font-size: ${({size="md"})=>fontSize[size]||"initial"};
    font-weight: ${({weight="normal"})=>fontWeight[weight]||"initial"};
  }
  && {
    ${props=>props.css}
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/user/UserInfoModal/UserInfoModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>UserInfoModal_UserInfoModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),react=__webpack_require__("./node_modules/react/index.js"),dist=__webpack_require__("./node_modules/react-router/dist/index.js"),useFetchUserInfo=__webpack_require__("./src/hooks/queries/useFetchUserInfo.ts"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),user=__webpack_require__("./src/apis/user.ts");var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),constants_localStorage=__webpack_require__("./src/constants/localStorage.ts"),routes=__webpack_require__("./src/constants/routes.ts"),constants_user=__webpack_require__("./src/constants/user.ts");const useUserInfoModal=()=>{const navigate=(0,dist.s0)(),{showToast}=(0,useToast.p)(),{closeModal}=(0,useModal.d)(),{mutateModifyUserInfo}=(()=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,user.NJ)(body)),{onSuccess:()=>{queryClient.invalidateQueries(["userInfo"])}});return{mutateModifyUserInfo:mutate}})(),{userInfo}=(0,useFetchUserInfo.j)(),[isUserInfoEditing,setIsUserInfoEditing]=(0,react.useState)(!1),[userName,setUserName]=(0,react.useState)(""),userNameRef=(0,react.useRef)(null);(0,useClickOutside.Z)(userNameRef,(()=>{isUserInfoEditing&&setIsUserInfoEditing((()=>!1))}));return(0,react.useEffect)((()=>{userInfo&&setUserName((()=>userInfo.name))}),[userInfo,isUserInfoEditing]),{userInfo,userName,userNameRef,isUserInfoEditing,handlers:{handleClose:()=>{setIsUserInfoEditing((()=>!1)),closeModal()},handleLogoutClick:()=>{confirm("로그아웃 하시겠습니까?")&&(alert("로그아웃 되었습니다."),localStorage.removeItem(constants_localStorage.J.ACCESS_TOKEN),localStorage.removeItem(constants_localStorage.J.TEAM_PLACE_ID),navigate(routes.y.LANDING))},handleUserNameChange:e=>{setUserName((()=>e.target.value))},handleUserInfoEditButtonClick:()=>{setIsUserInfoEditing((()=>!0))},handleUserInfoSubmit:e=>{e.preventDefault();const name=userName.trim();""!==name&&name!==userInfo?.name?name.length>constants_user.O?showToast("error",`닉네임은 최대 ${constants_user.O}자까지 입력할 수 있습니다.`):mutateModifyUserInfo({name},{onSuccess:()=>{setIsUserInfoEditing((()=>!1)),showToast("success","닉네임이 변경되었습니다.")},onError:()=>{showToast("error","닉네임 변경에 실패했습니다.")}}):setIsUserInfoEditing((()=>!1))}}}};var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: hidden;
  top: 50px;
  right: 20px;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 270px;
  height: 420px;
  padding: 20px 30px;
  gap: 10px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};
`,UserInfoForm=styled_components_browser_esm.zo.form`
  display: flex;
  align-items: center;

  column-gap: 6px;

  &:focus {
    outline: ${({theme})=>theme.color.PRIMARY};
  }
`,UserNameInputContainer=styled_components_browser_esm.zo.div`
  width: 200px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,UserNameContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 20px;
  column-gap: 5px;
`,ProfileImage=styled_components_browser_esm.zo.img`
  width: 200px;
  height: 200px;
  margin: 10px auto;

  border-radius: 50%;
  object-fit: cover;
`,serviceCenterButton=styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;
`,logoutButton=(styled_components_browser_esm.iv`
  opacity: 0;
  color: ${({theme})=>theme.color.RED};
`,styled_components_browser_esm.iv`
  display: flex;
  align-items: center;

  margin: 0 auto;
  padding: 8px;
  gap: 2px;
`),UserInfoModal_styled_userName=styled_components_browser_esm.iv`
  overflow: hidden;

  max-width: 140px;

  font-weight: 500;
  white-space: pre;
  text-overflow: ellipsis;
  text-align: center;
`,UserInfoModal_styled_email=styled_components_browser_esm.iv`
  margin: 0 auto;

  font-size: 14px;
  color: ${({theme})=>theme.color.GRAY600};
`,userInfoEditButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,userInfoSubmitButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;
  padding: 2px;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }
`,userNameLength=styled_components_browser_esm.iv`
  font-size: 12px;
  color: ${({theme})=>theme.color.GRAY600};
  white-space: pre;
`,userNameInput=styled_components_browser_esm.iv`
  border: none;
  border-radius: 4px;

  &:focus {
    outline: none;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const UserInfoModal=props=>{const{userInfo,userName,userNameRef,isUserInfoEditing,handlers:{handleClose,handleLogoutClick,handleUserNameChange,handleUserInfoEditButtonClick,handleUserInfoSubmit}}=useUserInfoModal(),{onServiceCenterButtonClick}=props;if(!userInfo)return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{});const{name,profileImageUrl,email}=userInfo;return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:handleClose}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"lg",weight:"semiBold",children:"프로필"}),(0,jsx_runtime.jsx)(ProfileImage,{src:profileImageUrl,alt:"프로필 이미지"}),(0,jsx_runtime.jsx)(UserNameContainer,{ref:userNameRef,children:isUserInfoEditing?(0,jsx_runtime.jsxs)(UserInfoForm,{onSubmit:handleUserInfoSubmit,children:[(0,jsx_runtime.jsxs)(UserNameInputContainer,{children:[(0,jsx_runtime.jsx)(Input.Z,{width:"160px",height:"32px",placeholder:name,value:userName,onChange:handleUserNameChange,minLength:1,maxLength:constants_user.O,css:userNameInput,autoFocus:!0}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:userNameLength,children:`${userName.length}/${constants_user.O}`})]}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",css:userInfoSubmitButton,children:(0,jsx_runtime.jsx)(svg.yZ,{})})]}):(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xl",css:UserInfoModal_styled_userName,children:name}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain","aria-label":"닉네임 수정하기",css:userInfoEditButton,onClick:handleUserInfoEditButtonClick,children:(0,jsx_runtime.jsx)(svg.dY,{})})]})}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",css:UserInfoModal_styled_email,children:email}),(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"normal",css:logoutButton,onClick:handleLogoutClick,children:["로그아웃",(0,jsx_runtime.jsx)(svg.R0,{})]}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:serviceCenterButton,onClick:onServiceCenterButtonClick,"aria-label":"고객문의",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"고객문의"})})]})]})};UserInfoModal.displayName="UserInfoModal";const UserInfoModal_UserInfoModal=UserInfoModal;try{UserInfoModal.displayName="UserInfoModal",UserInfoModal.__docgenInfo={description:"",displayName:"UserInfoModal",props:{onServiceCenterButtonClick:{defaultValue:null,description:"",name:"onServiceCenterButtonClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/user/UserInfoModal/UserInfoModal.tsx#UserInfoModal"]={docgenInfo:UserInfoModal.__docgenInfo,name:"UserInfoModal",path:"src/components/user/UserInfoModal/UserInfoModal.tsx#UserInfoModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/routes.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{y:()=>PATH_NAME});const PATH_NAME={LANDING:"/",POLICY:"/policy",LOGIN:"/login",START:"/start",JOIN:"/join",CREATE:"/create",TEAM_SELECT:"/team",TEAM_OVERVIEW:"/team/overview",TEAM_CALENDAR:"/team/calendar",TEAM_FEED:"/team/feed",TEAM_LINK:"/team/link"}},"./src/constants/user.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{M:()=>ACCOUNT_DELETE_CONFIRM_TEXT,O:()=>MAX_USER_NAME_LENGTH});const MAX_USER_NAME_LENGTH=20,ACCOUNT_DELETE_CONFIRM_TEXT="탈퇴합니다"},"./src/hooks/queries/useFetchUserInfo.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>useFetchUserInfo});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),_apis_user__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/user.ts");const useFetchUserInfo=()=>{const{data}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.a)(["userInfo"],_apis_user__WEBPACK_IMPORTED_MODULE_0__.CS);return{userInfo:data}}},"./src/hooks/useClickOutside.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=(ref,callback)=>{(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const handleClickOutside=e=>{ref.current&&!ref.current.contains(e.target)&&callback(e)};return document.addEventListener("mousedown",handleClickOutside),document.addEventListener("touchstart",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside),document.removeEventListener("touchstart",handleClickOutside)}}),[callback,ref])}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}}}]);
//# sourceMappingURL=components-user-UserInfoModal-UserInfoModal-stories.ba927864.iframe.bundle.js.map