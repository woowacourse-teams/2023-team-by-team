"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6738],{"./src/components/common/Checkbox/Checkbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomColor:()=>CustomColor,CustomStyle:()=>CustomStyle,ExtraLarge:()=>ExtraLarge,ExtraLargeNotChecked:()=>ExtraLargeNotChecked,Large:()=>Large,LargeNotChecked:()=>LargeNotChecked,Medium:()=>Medium,MediumNotChecked:()=>MediumNotChecked,Small:()=>Small,SmallNotChecked:()=>SmallNotChecked,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _Checkbox__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/common/Checkbox/Checkbox.tsx"),styled_components__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const __WEBPACK_DEFAULT_EXPORT__={title:"common/Checkbox",component:_Checkbox__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"],parameters:{docs:{description:{component:"`Checkbox`는 대부분의 상황에서 사용할 수 있는 공용 체크박스 컴포넌트입니다."}}}},Medium={args:{isChecked:!0,onChange:()=>alert("체크박스의 onChange 이벤트가 실행되었습니다! 추후 이 이벤트를 핸들링해 state를 변경한다면, 체크박스도 바뀔 것입니다!")}},MediumNotChecked={args:{isChecked:!1}},Small={args:{size:"sm",isChecked:!0}},SmallNotChecked={args:{size:"sm",isChecked:!1}},Large={args:{size:"lg",isChecked:!0}},LargeNotChecked={args:{size:"lg",isChecked:!1}},ExtraLarge={args:{size:"xl",isChecked:!0}},ExtraLargeNotChecked={args:{size:"xl",isChecked:!1}},CustomColor={args:{size:"md",isChecked:!0,color:"#ff8888"}},CustomStyle={args:{size:"xl",isChecked:!0,css:styled_components__WEBPACK_IMPORTED_MODULE_1__.iv`
      width: 70px;
      height: 50px;

      border: none;
      background: linear-gradient(45deg, #00ffe5, #2600ff, #ff0ff7);
    `}};Medium.parameters={...Medium.parameters,docs:{...Medium.parameters?.docs,source:{originalSource:"{\n  args: {\n    isChecked: true,\n    onChange: () => alert('체크박스의 onChange 이벤트가 실행되었습니다! 추후 이 이벤트를 핸들링해 state를 변경한다면, 체크박스도 바뀔 것입니다!')\n  }\n}",...Medium.parameters?.docs?.source}}},MediumNotChecked.parameters={...MediumNotChecked.parameters,docs:{...MediumNotChecked.parameters?.docs,source:{originalSource:"{\n  args: {\n    isChecked: false\n  }\n}",...MediumNotChecked.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'sm',\n    isChecked: true\n  }\n}",...Small.parameters?.docs?.source}}},SmallNotChecked.parameters={...SmallNotChecked.parameters,docs:{...SmallNotChecked.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'sm',\n    isChecked: false\n  }\n}",...SmallNotChecked.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'lg',\n    isChecked: true\n  }\n}",...Large.parameters?.docs?.source}}},LargeNotChecked.parameters={...LargeNotChecked.parameters,docs:{...LargeNotChecked.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'lg',\n    isChecked: false\n  }\n}",...LargeNotChecked.parameters?.docs?.source}}},ExtraLarge.parameters={...ExtraLarge.parameters,docs:{...ExtraLarge.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'xl',\n    isChecked: true\n  }\n}",...ExtraLarge.parameters?.docs?.source}}},ExtraLargeNotChecked.parameters={...ExtraLargeNotChecked.parameters,docs:{...ExtraLargeNotChecked.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'xl',\n    isChecked: false\n  }\n}",...ExtraLargeNotChecked.parameters?.docs?.source}}},CustomColor.parameters={...CustomColor.parameters,docs:{...CustomColor.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    isChecked: true,\n    color: '#ff8888'\n  }\n}",...CustomColor.parameters?.docs?.source}}},CustomStyle.parameters={...CustomStyle.parameters,docs:{...CustomStyle.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'xl',\n    isChecked: true,\n    css: css`\n      width: 70px;\n      height: 50px;\n\n      border: none;\n      background: linear-gradient(45deg, #00ffe5, #2600ff, #ff0ff7);\n    `\n  }\n}",...CustomStyle.parameters?.docs?.source}}};const __namedExportsOrder=["Medium","MediumNotChecked","Small","SmallNotChecked","Large","LargeNotChecked","ExtraLarge","ExtraLargeNotChecked","CustomColor","CustomStyle"]},"./src/components/common/Checkbox/Checkbox.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Checkbox_Checkbox});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const checkboxSizes={sm:styled_components_browser_esm.iv`
    width: 20px;
    height: 20px;
    border-radius: 2px;
  `,md:styled_components_browser_esm.iv`
    width: 26px;
    height: 26px;
    border-radius: 3px;
  `,lg:styled_components_browser_esm.iv`
    width: 32px;
    height: 32px;
    border-radius: 4px;
  `,xl:styled_components_browser_esm.iv`
    width: 38px;
    height: 38px;
    border-radius: 5px;
  `},checkIconSizes={sm:styled_components_browser_esm.iv`
    width: 14px;
    height: 14px;
  `,md:styled_components_browser_esm.iv`
    width: 20px;
    height: 20px;
  `,lg:styled_components_browser_esm.iv`
    width: 26px;
    height: 26px;
  `,xl:styled_components_browser_esm.iv`
    width: 32px;
    height: 32px;
  `},RealCheckbox=styled_components_browser_esm.zo.input`
  appearance: none;
`,CustomCheckbox=styled_components_browser_esm.zo.span`
  display: inline-block;

  ${({size="md"})=>checkboxSizes[size]}

  border: 3px solid
    ${({color,theme})=>color||theme.color.PRIMARY};
  background: transparent;

  transition: 0.2s;
  cursor: pointer;

  ${RealCheckbox}:checked ~ & {
    background-color: ${({color,theme})=>color||theme.color.PRIMARY};
  }

  ${RealCheckbox} ~ & svg {
    opacity: 0;
    transition: 0.2s;
  }

  ${RealCheckbox}:checked ~ & svg {
    opacity: 1;
  }

  ${({css})=>css};
`,CheckIconWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  & svg {
    ${({size="md"})=>checkIconSizes[size]}
  }
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Checkbox=props=>{const{isChecked,onChange,color,size="md",css}=props;return(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(RealCheckbox,{type:"checkbox",checked:isChecked,onChange}),(0,jsx_runtime.jsx)(CustomCheckbox,{color,css,size,children:(0,jsx_runtime.jsx)(CheckIconWrapper,{size,children:(0,jsx_runtime.jsx)(svg.nQ,{})})})]})};Checkbox.displayName="Checkbox";const Checkbox_Checkbox=Checkbox;try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{isChecked:{defaultValue:null,description:"",name:"isChecked",required:!0,type:{name:"boolean"}},color:{defaultValue:null,description:"",name:"color",required:!1,type:{name:"string"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(() => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Checkbox/Checkbox.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/components/common/Checkbox/Checkbox.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-Checkbox-Checkbox-stories.b440a0ce.iframe.bundle.js.map