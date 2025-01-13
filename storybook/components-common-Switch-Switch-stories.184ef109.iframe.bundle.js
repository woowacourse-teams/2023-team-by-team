"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2837],{"./src/components/common/Switch/Switch.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Disabled:()=>Disabled,ExtraSmall:()=>ExtraSmall,Large:()=>Large,Medium:()=>Medium,Playground:()=>Playground,Raised:()=>Raised,ReadOnly:()=>ReadOnly,Small:()=>Small,Solid:()=>Solid,WithCustomColor:()=>WithCustomColor,WithDescription:()=>WithDescription,WithDescriptionComponent:()=>WithDescriptionComponent,WithInnerLabel:()=>WithInnerLabel,WithThumbText:()=>WithThumbText,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_storybook_test__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/test/dist/index.mjs"),_Switch__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/Switch/Switch.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"common/Switch",component:_Switch__WEBPACK_IMPORTED_MODULE_2__.A,tags:["autodocs"],render:function Render(args){const[checked,setChecked]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Switch__WEBPACK_IMPORTED_MODULE_2__.A,{...args,checked,onChange:()=>{setChecked((prevChecked=>!prevChecked))}})},argTypes:{checked:{control:"boolean"},onChange:{action:"clicked"},size:{control:{type:"select",options:["xs","sm","md","lg"]},description:"스위치 크기"},variant:{control:{type:"select",options:["solid","raised"]},description:"solid : track안에 thumb이 들어 있는 유형, raised : track보다 thumb이 큰 유형"},readonly:{control:"boolean"},disabled:{control:"boolean"},description:{control:"text",description:"스위치에 대한 설명이 되는 컴포넌트"},descriptionPosition:{control:{type:"select",options:["top","bottom","left","right"]},description:"설명 위치(상/하/좌/우)"},onLabel:{control:"text",description:"스위치가 켜져 있을 때의 트랙 라벨 내 들어갈 텍스트 또는 아이콘"},offLabel:{control:"text",description:"스위치가 꺼져 있을 때의 트랙 라벨 내 들어갈 텍스트 또는 아이콘"},onThumb:{control:"text",description:"스위치가 켜져 있을 때의 thumb 내 들어갈 텍스트 또는 아이콘"},offThumb:{control:"text",description:"스위치가 꺼져 있을 때의 thumb 내 들어갈 텍스트 또는 아이콘"},onColor:{control:"color",description:"스위치가 켜져 있을 때의 트랙 색상"},offColor:{control:"color",description:"스위치가 꺼져 있을 때의 트랙 색상"},thumbOnColor:{control:"color",description:"스위치가 켜져 있을 때의 thumb 색상"},thumbOffColor:{control:"color",description:"스위치가 꺼져 있을 때의 thumb 색상"}},parameters:{docs:{description:{component:"공용 Switch 컴포넌트"}}}},Solid={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)()}},Raised={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),variant:"raised"}},ExtraSmall={args:{size:"xs",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)()}},Small={args:{size:"sm",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)()}},Medium={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)()}},Large={args:{size:"lg",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)()}},WithDescription={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:"이것은 설명입니다."})}},WithDescriptionComponent={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),description:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{display:"flex",alignItems:"center"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span",{style:{marginLeft:"8px"},children:"로그인"})})}},WithCustomColor={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),onColor:"rgb(21, 99, 223)",offColor:"#99b4d9",thumbOnColor:"#1a0cdc",thumbOffColor:"#040d32"}},WithThumbText={args:{size:"lg",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),onThumb:"ON",offThumb:"OFF"}},WithInnerLabel={args:{size:"lg",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),onLabel:"자동 업데이트",offLabel:"수동 업데이트"}},Disabled={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),description:"Disabled switch",disabled:!0}},ReadOnly={args:{size:"md",checked:!1,onChange:(0,_storybook_test__WEBPACK_IMPORTED_MODULE_1__.fn)(),description:"Read-only switch",readonly:!0}},Playground={render:()=>{const[checked,setChecked]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div",{style:{display:"flex",gap:"20px"},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Switch__WEBPACK_IMPORTED_MODULE_2__.A,{size:"md",checked,onChange:()=>{console.log("Switch Changed"),setChecked((prevChecked=>!prevChecked))}}),checked&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{children:"💡"})]})},args:{size:"md",variant:"solid"}},__namedExportsOrder=["Solid","Raised","ExtraSmall","Small","Medium","Large","WithDescription","WithDescriptionComponent","WithCustomColor","WithThumbText","WithInnerLabel","Disabled","ReadOnly","Playground"];Solid.parameters={...Solid.parameters,docs:{...Solid.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn()\n  }\n}",...Solid.parameters?.docs?.source}}},Raised.parameters={...Raised.parameters,docs:{...Raised.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    variant: 'raised'\n  }\n}",...Raised.parameters?.docs?.source}}},ExtraSmall.parameters={...ExtraSmall.parameters,docs:{...ExtraSmall.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'xs',\n    checked: false,\n    onChange: fn()\n  }\n}",...ExtraSmall.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'sm',\n    checked: false,\n    onChange: fn()\n  }\n}",...Small.parameters?.docs?.source}}},Medium.parameters={...Medium.parameters,docs:{...Medium.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn()\n  }\n}",...Medium.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'lg',\n    checked: false,\n    onChange: fn()\n  }\n}",...Large.parameters?.docs?.source}}},WithDescription.parameters={...WithDescription.parameters,docs:{...WithDescription.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    description: <div>이것은 설명입니다.</div>\n  }\n}",...WithDescription.parameters?.docs?.source}}},WithDescriptionComponent.parameters={...WithDescriptionComponent.parameters,docs:{...WithDescriptionComponent.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    description: <div style={{\n      display: 'flex',\n      alignItems: 'center'\n    }}>\n        <span style={{\n        marginLeft: '8px'\n      }}>로그인</span>\n      </div>\n  }\n}",...WithDescriptionComponent.parameters?.docs?.source}}},WithCustomColor.parameters={...WithCustomColor.parameters,docs:{...WithCustomColor.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    onColor: 'rgb(21, 99, 223)',\n    offColor: '#99b4d9',\n    thumbOnColor: '#1a0cdc',\n    thumbOffColor: '#040d32'\n  }\n}",...WithCustomColor.parameters?.docs?.source}}},WithThumbText.parameters={...WithThumbText.parameters,docs:{...WithThumbText.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'lg',\n    checked: false,\n    onChange: fn(),\n    onThumb: 'ON',\n    offThumb: 'OFF'\n  }\n}",...WithThumbText.parameters?.docs?.source}}},WithInnerLabel.parameters={...WithInnerLabel.parameters,docs:{...WithInnerLabel.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'lg',\n    checked: false,\n    onChange: fn(),\n    onLabel: '자동 업데이트',\n    offLabel: '수동 업데이트'\n  }\n}",...WithInnerLabel.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    description: 'Disabled switch',\n    disabled: true\n  }\n}",...Disabled.parameters?.docs?.source}}},ReadOnly.parameters={...ReadOnly.parameters,docs:{...ReadOnly.parameters?.docs,source:{originalSource:"{\n  args: {\n    size: 'md',\n    checked: false,\n    onChange: fn(),\n    description: 'Read-only switch',\n    readonly: true\n  }\n}",...ReadOnly.parameters?.docs?.source}}},Playground.parameters={...Playground.parameters,docs:{...Playground.parameters?.docs,source:{originalSource:"{\n  render: () => {\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [checked, setChecked] = useState(false);\n    const handleChange = () => {\n      console.log('Switch Changed');\n      setChecked(prevChecked => !prevChecked);\n    };\n    return <div style={{\n      display: 'flex',\n      gap: '20px'\n    }}>\n        <Switch size=\"md\" checked={checked} onChange={handleChange} />\n        {checked && <div>💡</div>}\n      </div>;\n  },\n  args: {\n    size: 'md',\n    variant: 'solid'\n  }\n}",...Playground.parameters?.docs?.source}}}},"./src/components/common/Switch/Switch.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Switch_Switch});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const backgroundColor=($isOn,$offColor,$onColor)=>styled_components_browser_esm.AH`
  background-color: ${$isOn?$onColor||theme.A.color.BLACK:$offColor||theme.A.color.GRAY200};
`,flexStyles={column:styled_components_browser_esm.AH`
    flex-direction: column;
  `,row:styled_components_browser_esm.AH`
    flex-direction: row;
  `},sizeStyles={xs:styled_components_browser_esm.AH`
    min-width: 28px;
    height: 16px;
  `,sm:styled_components_browser_esm.AH`
    min-width: 38px;
    height: 20px;
  `,md:styled_components_browser_esm.AH`
    min-width: 48px;
    height: 24px;
  `,lg:styled_components_browser_esm.AH`
    min-width: 58px;
    height: 30px;
  `},thumbSizes={xs:styled_components_browser_esm.AH`
    font-size: 4px;
    width: 12px;
    height: 12px;
  `,sm:styled_components_browser_esm.AH`
    font-size: 6px;
    width: 16px;
    height: 16px;
  `,md:styled_components_browser_esm.AH`
    font-size: 8px;
    width: 20px;
    height: 20px;
  `,lg:styled_components_browser_esm.AH`
    font-size: 10px;
    width: 25px;
    height: 25px;
  `},ContainerDiv=styled_components_browser_esm.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  ${({$descriptionPosition})=>["top","bottom"].includes($descriptionPosition)?flexStyles.column:flexStyles.row}
`,Label=styled_components_browser_esm.Ay.label`
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({$size})=>sizeStyles[$size]}
`,TrackDiv=styled_components_browser_esm.Ay.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: background 0.4s;
  background-color: ${({$offColor})=>$offColor||theme.A.color.GRAY200};

  ${({$variant})=>"solid"===$variant?styled_components_browser_esm.AH`
        height: 100%;
      `:styled_components_browser_esm.AH`
      height: 40%;
    `}

  ${({$isOn,$offColor,$onColor})=>backgroundColor($isOn,$offColor,$onColor)};
`,LabelSpan=styled_components_browser_esm.Ay.span`
  font-size: 14px;
  white-space: nowrap;
  color: ${({$isOn,$onColor,$offColor})=>$isOn?$onColor||theme.A.color.WHITE:$offColor||theme.A.color.GRAY700};
  flex-grow: 1;
  text-align: center;

  ${({$size})=>"sm"===$size?styled_components_browser_esm.AH`
        font-size: 12px;
      `:"xs"===$size?styled_components_browser_esm.AH`
        font-size: 8px;
      `:void 0}

  ${({$isOn})=>$isOn?styled_components_browser_esm.AH`
        margin-left: 10px;
      `:styled_components_browser_esm.AH`
      margin-right: 10px;
    `}


  ${({$size,$isOn})=>styled_components_browser_esm.AH`
      margin-${$isOn?"right":"left"}: calc(${"xs"===$size?"18px":"sm"===$size?"23px":"md"===$size?"28px":"34px"});
    `};
`,ThumbSpan=styled_components_browser_esm.Ay.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({$isOn,$offColor,$onColor})=>backgroundColor($isOn,$offColor??theme.A.color.WHITE,$onColor??theme.A.color.WHITE)};

  ${({$size})=>thumbSizes[$size]};

  ${({$size,$isOn,$variant})=>{const solidLeftPositions={xs:"calc(100% - 14px)",sm:"calc(100% - 19px)",md:"calc(100% - 23px)",lg:"calc(100% - 29px)"};return"solid"===$variant?styled_components_browser_esm.AH`
        left: ${$isOn?solidLeftPositions[$size]:"xs"===$size?"2px":"3px"};
        transition: left 0.4s;
      `:styled_components_browser_esm.AH`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      transition: transform 0.4s;
      ${$isOn&&"transform: translateX(142%);"}
    `}}
`,ToggleInput=styled_components_browser_esm.Ay.input.attrs({type:"checkbox"})`
  display: none;

  &:disabled + ${TrackDiv},&:disabled + ${ThumbSpan} {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Switch=({checked,onChange,size="md",variant="solid",style,description,descriptionPosition="right",onLabel,offLabel,onThumb,offThumb,readonly=!1,disabled=!1,onColor,offColor,onLabelColor,offLabelColor,thumbOnColor,thumbOffColor})=>{const[isOn,setIsOn]=(0,react.useState)(checked);(0,react.useRef)(null);return(0,react.useEffect)((()=>{checked!==isOn&&setIsOn(checked)}),[checked,isOn]),(0,jsx_runtime.jsxs)(ContainerDiv,{$descriptionPosition:descriptionPosition,style,children:[description&&["top","left"].includes(descriptionPosition)&&description,(0,jsx_runtime.jsxs)(Label,{$size:size,children:[(0,jsx_runtime.jsx)(ToggleInput,{type:"checkbox",checked:isOn,onChange:()=>{readonly||disabled||(setIsOn((prevState=>!prevState)),onChange())},readOnly:readonly,disabled}),(0,jsx_runtime.jsxs)(TrackDiv,{$variant:variant,$isOn:isOn,$offColor:offColor,$onColor:onColor,children:[(0,jsx_runtime.jsx)(LabelSpan,{$size:size,$isOn:isOn,$onColor:onLabelColor,$offColor:offLabelColor,children:isOn?onLabel:offLabel}),(0,jsx_runtime.jsx)(ThumbSpan,{$variant:variant,$size:size,$isOn:isOn,$offColor:thumbOffColor,$onColor:thumbOnColor,children:isOn?onThumb:offThumb})]})]}),description&&["bottom","right"].includes(descriptionPosition)&&description]})},Switch_Switch=Switch;try{Switch.displayName="Switch",Switch.__docgenInfo={description:"Switch 컴포넌트",displayName:"Switch",props:{checked:{defaultValue:null,description:"",name:"checked",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"() => void"}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},variant:{defaultValue:{value:"solid"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"solid"'},{value:'"raised"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"ReactNode"}},descriptionPosition:{defaultValue:{value:"right"},description:"",name:"descriptionPosition",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"left"'},{value:'"right"'},{value:'"top"'}]}},onLabel:{defaultValue:null,description:"",name:"onLabel",required:!1,type:{name:"ReactNode"}},offLabel:{defaultValue:null,description:"",name:"offLabel",required:!1,type:{name:"ReactNode"}},onThumb:{defaultValue:null,description:"",name:"onThumb",required:!1,type:{name:"ReactNode"}},offThumb:{defaultValue:null,description:"",name:"offThumb",required:!1,type:{name:"ReactNode"}},readonly:{defaultValue:{value:"false"},description:"",name:"readonly",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},onColor:{defaultValue:null,description:"",name:"onColor",required:!1,type:{name:"string"}},offColor:{defaultValue:null,description:"",name:"offColor",required:!1,type:{name:"string"}},onLabelColor:{defaultValue:null,description:"",name:"onLabelColor",required:!1,type:{name:"string"}},offLabelColor:{defaultValue:null,description:"",name:"offLabelColor",required:!1,type:{name:"string"}},thumbOnColor:{defaultValue:null,description:"",name:"thumbOnColor",required:!1,type:{name:"string"}},thumbOffColor:{defaultValue:null,description:"",name:"thumbOffColor",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Switch/Switch.tsx#Switch"]={docgenInfo:Switch.__docgenInfo,name:"Switch",path:"src/components/common/Switch/Switch.tsx#Switch"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-common-Switch-Switch-stories.184ef109.iframe.bundle.js.map