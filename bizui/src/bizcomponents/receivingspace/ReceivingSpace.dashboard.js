

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ReceivingSpace.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'
import appLocaleName from '../../common/Locale.tool'

const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers,defaultQuickFunctions
}= DashboardTool





const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(receivingSpace)=>{return [
	 ]}

const internalImageListOf = (receivingSpace) =>defaultImageListOf(receivingSpace,imageList)

const optionList =(receivingSpace)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (receivingSpace) =>defaultSettingListOf(receivingSpace, optionList)
const internalLargeTextOf = (receivingSpace) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <FontAwesome name="arrow-left"  /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName}</div>)

}


const internalSummaryOf = (receivingSpace,targetComponent) =>{
	
	
	const {ReceivingSpaceService} = GlobalComponents
	const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{receivingSpace.id}</Description> 
<Description term="位置">{receivingSpace.location}</Description> 
<Description term="联系电话">{receivingSpace.contactNumber}</Description> 
<Description term="描述">{receivingSpace.description}</Description> 
<Description term="总面积">{receivingSpace.totalArea}</Description> 
<Description term="仓库">{receivingSpace.warehouse==null?appLocaleName(userContext,"NotAssigned"):`${receivingSpace.warehouse.displayName}(${receivingSpace.warehouse.id})`}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"仓库","warehouse",ReceivingSpaceService.requestCandidateWarehouse,
	      ReceivingSpaceService.transferToAnotherWarehouse,"anotherWarehouseId",receivingSpace.warehouse?receivingSpace.warehouse.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="纬度">{receivingSpace.latitude}</Description> 
<Description term="经度">{receivingSpace.longitude}</Description> 
<Description term="最后更新时间">{ moment(receivingSpace.lastUpdateTime).format('YYYY-MM-DD')}</Description> 
	
        {buildTransferModal(receivingSpace,targetComponent)}
      </DescriptionList>
	)

}

const internalQuickFunctions = defaultQuickFunctions

class ReceivingSpaceDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'receivingSpace'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, goodsListMetaInfo, goodsCount } = this.props.receivingSpace
    if(!this.props.receivingSpace.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:"收货区",cardsFor: "receivingSpace",
    	cardsSource: this.props.receivingSpace,returnURL,displayName,
  		subItems: [
{name: 'goodsList', displayName:'货物',type:'goods',count:goodsCount,addFunction: true, role: 'goods', metaInfo: goodsListMetaInfo},
    
      	],
  	};
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    const quickFunctions = this.props.quickFunctions || internalQuickFunctions
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
        {quickFunctions(cardsData)} 
        {renderExtraHeader(cardsData.cardsSource)}
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}        
        {largeTextOf(cardsData.cardsSource)}
  
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  receivingSpace: state._receivingSpace,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(ReceivingSpaceDashboard))

