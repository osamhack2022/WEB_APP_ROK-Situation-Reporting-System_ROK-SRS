import Head from 'next/head'
import Link from "next/link"
import RegisterHeader from '../../componenets/registerheader'
import {PageHeader, Breadcrumb } from 'antd';


const ReportSystem = () => {
    return <>
            <PageHeader className="site-page-header" title="보고체계 설정"
                breadcrumb={  
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href = "/settings">계정설정</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href = "/settings/unit">부대설정</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style = {{color: 'black', cursor: 'pointer'}}>보고체계 설정</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a style = {{display: 'none'}}>Null</a>
                </Breadcrumb.Item>
            </Breadcrumb> } style={{backgroundColor: "white",  boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'}}/>
    </>
}

export default ReportSystem;