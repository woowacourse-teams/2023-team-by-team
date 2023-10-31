"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8635],{"./src/components/user/ServiceCenterModal/ServiceCenterModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useModal.ts"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.tsx"),_components_user_ServiceCenterModal_ServiceCenterModal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/user/ServiceCenterModal/ServiceCenterModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"user/ServiceCenterModal",component:_components_user_ServiceCenterModal_ServiceCenterModal__WEBPACK_IMPORTED_MODULE_2__.Z,tags:["autodocs"],parameters:{docs:{description:{component:"`ServiceCenterModal` 는 팀바팀 정보를 담고있는 모달입니다."}}}},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_0__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_user_ServiceCenterModal_ServiceCenterModal__WEBPACK_IMPORTED_MODULE_2__.Z,{onAccountDeleteButtonClick:()=>alert("고객문의")})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{onAccountDeleteButtonClick:()=>alert("고객문의")}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    onAccountDeleteButtonClick: () => alert('고객문의')\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Accordion/Accordion.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Accordion_Accordion});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const AccordionContext=(0,react.createContext)({}),AccordionProvider=props=>{const{children}=props,[openedAccordion,setOpenedAccordion]=(0,react.useState)(),value={openedAccordion,handleOpenedAccordionChange:id=>{setOpenedAccordion(openedAccordion===id?()=>{}:()=>id)}};return(0,jsx_runtime.jsx)(AccordionContext.Provider,{value,children})};AccordionProvider.displayName="AccordionProvider";try{AccordionProvider.displayName="AccordionProvider",AccordionProvider.__docgenInfo={description:"",displayName:"AccordionProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionContext.tsx#AccordionProvider"]={docgenInfo:AccordionProvider.__docgenInfo,name:"AccordionProvider",path:"src/components/common/Accordion/AccordionContext.tsx#AccordionProvider"})}catch(__react_docgen_typescript_loader_error){}var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.ZP.div`
  cursor: pointer;

  ${({$isOpen=!1})=>{if($isOpen)return styled_components_browser_esm.iv`
        outline: 3px ridge rgba(0, 46, 210, 0.381);
        border-radius: 2px;
      `}}
  svg {
    transition: transform 0.2s ease-in-out;
    ${({$isOpen=!1})=>$isOpen?styled_components_browser_esm.iv`
          transform: rotate(-180deg);
        `:styled_components_browser_esm.iv`
        transform: rotate(0);
      `}
  }
`,accordionButton=$padding=>styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  overflow-anchor: none;

  width: 100%;
  padding: ${$padding};
  text-align: left;

  border: 0;
  border-radius: 0;
`,DisabledWrapper=styled_components_browser_esm.ZP.div`
  ${({$padding})=>accordionButton($padding)}
`;try{Container.displayName="Container",Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#Container"]={docgenInfo:Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}try{accordionButton.displayName="accordionButton",accordionButton.__docgenInfo={description:"",displayName:"accordionButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#accordionButton"]={docgenInfo:accordionButton.__docgenInfo,name:"accordionButton",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#accordionButton"})}catch(__react_docgen_typescript_loader_error){}try{DisabledWrapper.displayName="DisabledWrapper",DisabledWrapper.__docgenInfo={description:"",displayName:"DisabledWrapper",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#DisabledWrapper"]={docgenInfo:DisabledWrapper.__docgenInfo,name:"DisabledWrapper",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.styled.tsx#DisabledWrapper"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/common/Button/Button.tsx");const useAccordion=()=>{const context=(0,react.useContext)(AccordionContext);if(void 0===context)throw new Error("useAccordion must be used within a AccordionProvider");return context};var svg=__webpack_require__("./src/assets/svg/index.ts");const AccordionHeader=props=>{const{id,padding="16px 18px 12px",disabled=!1,children}=props,{openedAccordion,handleOpenedAccordionChange}=useAccordion();return(0,jsx_runtime.jsx)(Container,{$isOpen:id===openedAccordion,children:disabled?(0,jsx_runtime.jsx)(DisabledWrapper,{$padding:padding,children}):(0,jsx_runtime.jsxs)(Button.Z,{type:"button",variant:"plain","aria-expanded":id===openedAccordion,css:accordionButton(padding),onClick:()=>handleOpenedAccordionChange(id),children:[children,(0,jsx_runtime.jsx)(svg.gV,{})]})})};AccordionHeader.displayName="AccordionHeader";const AccordionHeader_AccordionHeader=AccordionHeader;try{AccordionHeader.displayName="AccordionHeader",AccordionHeader.__docgenInfo={description:"",displayName:"AccordionHeader",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}},padding:{defaultValue:null,description:"",name:"padding",required:!1,type:{name:"Padding<string | number>"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionHeader/AccordionHeader.tsx#AccordionHeader"]={docgenInfo:AccordionHeader.__docgenInfo,name:"AccordionHeader",path:"src/components/common/Accordion/AccordionHeader/AccordionHeader.tsx#AccordionHeader"})}catch(__react_docgen_typescript_loader_error){}const AccordionItem_styled_Container=styled_components_browser_esm.ZP.div`
  border-bottom: 1px solid ${({theme})=>theme.color.GRAY300};

  &:last-child {
    border-bottom: none;
  }
`;try{AccordionItem_styled_Container.displayName="Container",AccordionItem_styled_Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionItem/AccordionItem.styled.tsx#Container"]={docgenInfo:AccordionItem_styled_Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/AccordionItem/AccordionItem.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}const AccordionItem=props=>{const{children}=props;return(0,jsx_runtime.jsx)(AccordionItem_styled_Container,{children})};AccordionItem.displayName="AccordionItem";const AccordionItem_AccordionItem=AccordionItem;try{AccordionItem.displayName="AccordionItem",AccordionItem.__docgenInfo={description:"",displayName:"AccordionItem",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionItem/AccordionItem.tsx#AccordionItem"]={docgenInfo:AccordionItem.__docgenInfo,name:"AccordionItem",path:"src/components/common/Accordion/AccordionItem/AccordionItem.tsx#AccordionItem"})}catch(__react_docgen_typescript_loader_error){}const Accordion_styled_Container=styled_components_browser_esm.ZP.div`
  width: ${({$width="auto"})=>$width};

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 4px;
`;try{Accordion_styled_Container.displayName="Container",Accordion_styled_Container.__docgenInfo={description:"",displayName:"Container",props:{theme:{defaultValue:null,description:"",name:"theme",required:!1,type:{name:"DefaultTheme"}},as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"void | WebTarget"}},forwardedAs:{defaultValue:null,description:"",name:"forwardedAs",required:!1,type:{name:"void | WebTarget"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/Accordion.styled.tsx#Container"]={docgenInfo:Accordion_styled_Container.__docgenInfo,name:"Container",path:"src/components/common/Accordion/Accordion.styled.tsx#Container"})}catch(__react_docgen_typescript_loader_error){}const AccordionBody_styled_Container=styled_components_browser_esm.ZP.div`
  overflow: hidden;
  height: ${({$isOpen,$height})=>$isOpen?$height+24:0}px;
  padding: ${({$isOpen})=>$isOpen?"10px 18px 12px":"0 18px"};
  border-top: 1px solid ${({theme})=>theme.color.GRAY300};

  transition: 0.35s ease;
`,AccordionBody=props=>{const{id,children}=props,{openedAccordion}=useAccordion(),[bodyHeight,setBodyHeight]=(0,react.useState)(0),ref=(0,react.useRef)(null);(0,react.useEffect)((()=>{if(!ref.current)return;const resizeObserver=new ResizeObserver((()=>{setBodyHeight((()=>ref.current?ref.current.clientHeight:0))}));return resizeObserver.observe(ref.current),()=>resizeObserver.disconnect()}));return(0,jsx_runtime.jsx)(AccordionBody_styled_Container,{$isOpen:id===openedAccordion,$height:id===openedAccordion?bodyHeight:0,children:(0,jsx_runtime.jsx)("div",{ref,children})})};AccordionBody.displayName="AccordionBody";const AccordionBody_AccordionBody=AccordionBody;try{AccordionBody.displayName="AccordionBody",AccordionBody.__docgenInfo={description:"",displayName:"AccordionBody",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/AccordionBody/AccordionBody.tsx#AccordionBody"]={docgenInfo:AccordionBody.__docgenInfo,name:"AccordionBody",path:"src/components/common/Accordion/AccordionBody/AccordionBody.tsx#AccordionBody"})}catch(__react_docgen_typescript_loader_error){}const Accordion=props=>{const{width,children}=props;return(0,jsx_runtime.jsx)(AccordionProvider,{children:(0,jsx_runtime.jsx)(Accordion_styled_Container,{$width:width,children})})};Accordion.displayName="Accordion",Accordion.Item=AccordionItem_AccordionItem,Accordion.Header=AccordionHeader_AccordionHeader,Accordion.Body=AccordionBody_AccordionBody;const Accordion_Accordion=Accordion;try{Accordion.displayName="Accordion",Accordion.__docgenInfo={description:"",displayName:"Accordion",props:{width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"Width<string | number>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Accordion/Accordion.tsx#Accordion"]={docgenInfo:Accordion.__docgenInfo,name:"Accordion",path:"src/components/common/Accordion/Accordion.tsx#Accordion"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/user/ServiceCenterModal/ServiceCenterModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ServiceCenterModal_ServiceCenterModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({theme})=>theme.zIndex.MODAL-1};

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 490px;
  max-width: 100%;
  padding: 18px 20px 20px 20px;
  row-gap: 10px;

  border-radius: 12px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  transform: translate(-50%, -50%);
`,ModalHeader=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 36px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,ModalBody=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
`,ExplainBox=styled_components_browser_esm.zo.div`
  padding: 10px;

  border-radius: 4px;
  background-color: ${({theme})=>theme.color.GRAY100};
`,AccountBodyContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  column-gap: 10px;
`,UrlWrapper=styled_components_browser_esm.zo.a`
  width: 100%;
`,closeButton=styled_components_browser_esm.iv`
  width: 32px;
  height: 38px;
  padding: 0;
`,dangerousButton=styled_components_browser_esm.iv`
  display: flex;
  position: relative;
  align-self: flex-end;
  align-items: center;
  padding: 0px;

  cursor: pointer;
`,dangerousText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.RED};
`,mailText=(styled_components_browser_esm.iv`
  white-space: pre;
`,styled_components_browser_esm.iv`
  text-decoration-line: underline;
`);var useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),Accordion=__webpack_require__("./src/components/common/Accordion/Accordion.tsx"),url=__webpack_require__("./src/constants/url.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ServiceCenterModal=props=>{const{closeModal}=(0,useModal.d)(),{onAccountDeleteButtonClick}=props;return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(ModalHeader,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"xl",weight:"bold",children:"고객문의"}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:closeButton,onClick:closeModal,"aria-label":"고객문의 닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})]}),(0,jsx_runtime.jsxs)(ModalBody,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"무엇을 도와드릴까요?"}),(0,jsx_runtime.jsxs)(ExplainBox,{children:["원하시는 내용이 없다면 아래 메일로 문의해 주세요.",(0,jsx_runtime.jsx)("a",{href:"mailto:teambyteam.official@gmail.com?subject=팀바팀 문의합니다.&body=이메일(팀바팀 계정):%0D%0A문의분류(계정, 서비스, 버그, 기능추가, 기타):%0D%0A문의내용:%0D%0A",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",size:"sm",css:mailText,children:"teambyteam.official@gmail.com"})})]}),(0,jsx_runtime.jsxs)(Accordion.Z,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Item,{children:(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:0,padding:"20px 18px",disabled:!0,children:(0,jsx_runtime.jsx)(UrlWrapper,{href:url.O8,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"피드백 남기기"})})})}),(0,jsx_runtime.jsxs)(Accordion.Z.Item,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Item,{children:(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:1,padding:"20px 18px",disabled:!0,children:(0,jsx_runtime.jsx)(UrlWrapper,{href:url.Mx,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"팀바팀 사용방법"})})})}),(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:2,padding:"10px 18px",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"팀바팀 소개"})}),(0,jsx_runtime.jsx)(Accordion.Z.Body,{id:2,children:(0,jsx_runtime.jsxs)(AccountBodyContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"'팀바팀'은 ✨쉽고 간단한 협업을 위한 서비스✨로 여러 협업을 진행할 때 복잡한 도구를 사용할 필요없이 여러가지 기능을 사용할 수 있습니다."}),(0,jsx_runtime.jsx)("a",{href:url.D_,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"팀바팀 Repository 이동하기"})})]})})]}),(0,jsx_runtime.jsxs)(Accordion.Z.Item,{children:[(0,jsx_runtime.jsx)(Accordion.Z.Header,{id:3,padding:"10px 18px",children:(0,jsx_runtime.jsx)(Text.Z,{weight:"semiBold",children:"Q&A"})}),(0,jsx_runtime.jsx)(Accordion.Z.Body,{id:3,children:(0,jsx_runtime.jsxs)(AccountBodyContainer,{children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"Q. 외부 캘린더(구글 캘린더, iOS 캘린더 앱)에서도 팀 일정을 보고 싶어요."}),(0,jsx_runtime.jsx)(Text.Z,{size:"sm",children:"아래 설명서를 참고해 주세요."}),(0,jsx_runtime.jsx)("a",{href:url.sE,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"sm",children:"📘 일정 파일(.ics) 사용법"})})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",children:"Q. 탈퇴는 어떻게 하나요?"}),(0,jsx_runtime.jsxs)(ContentContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",as:"span",children:"회원 탈퇴를 진행하시려면 옆 버튼을 눌러주세요."}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:dangerousButton,onClick:onAccountDeleteButtonClick,"aria-label":"회원탈퇴하기",children:(0,jsx_runtime.jsx)(Text.Z,{size:"sm",css:dangerousText,children:"회원 탈퇴"})})]})]})]})})]})]})]})]})]})};ServiceCenterModal.displayName="ServiceCenterModal";const ServiceCenterModal_ServiceCenterModal=ServiceCenterModal;try{ServiceCenterModal.displayName="ServiceCenterModal",ServiceCenterModal.__docgenInfo={description:"",displayName:"ServiceCenterModal",props:{onAccountDeleteButtonClick:{defaultValue:null,description:"",name:"onAccountDeleteButtonClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/user/ServiceCenterModal/ServiceCenterModal.tsx#ServiceCenterModal"]={docgenInfo:ServiceCenterModal.__docgenInfo,name:"ServiceCenterModal",path:"src/components/user/ServiceCenterModal/ServiceCenterModal.tsx#ServiceCenterModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/url.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D_:()=>TEAM_BY_TEAM_REPOSITORY,Mx:()=>TEAM_BY_TEAM_HOW_TO_USE_URL,O8:()=>USER_FEEDBACK_URL,sE:()=>ICALENDAR_USER_GUIDE_URL});const ICALENDAR_USER_GUIDE_URL="https://teambyteam.notion.site/a99a38a030d74be88e761a1dcb1559a1",USER_FEEDBACK_URL="https://forms.gle/Tk8DZ5Xzsc5615Ar7",TEAM_BY_TEAM_HOW_TO_USE_URL="https://teambyteam.notion.site/f84827ca26334913a1c724dfb9436887",TEAM_BY_TEAM_REPOSITORY="https://github.com/woowacourse-teams/2023-team-by-team"},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}}}]);
//# sourceMappingURL=components-user-ServiceCenterModal-ServiceCenterModal-stories.d0f796a0.iframe.bundle.js.map