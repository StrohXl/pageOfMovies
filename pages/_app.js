import { Layout, ConfigProvider, Affix, Button } from "antd"
import 'antd/dist/reset.css';
import '../styles/globals.scss'
import Search from '../components/Search'
import { useRouter } from "next/router";
import Icon from "@mdi/react";
import { useState, useEffect } from "react";
import { mdiMenu } from "@mdi/js";
import Nav from '../components/Nav'
import Link from "next/link";
import SiderNav from "../components/SiderNav";
import MenuResponsive from "../components/MenuResponsive";
const { Header, Footer, Sider, Content,  } = Layout;
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)

  const CloseDrawer=()=>{
    setOpenDrawer(false)
  }
  useEffect(()=>{CloseDrawer()},[router])

  return (
    <ConfigProvider

    >
      <Layout >
        <Affix offsetTop={0}>
        <Header  >
          <Link href={'/'}><span className="Title_Header">NEXTMOVIE</span></Link>
          <Nav mode={'horizontal'} />
          <Search />
          <Icon className="MenuBurger" onClick={()=> setOpenDrawer(true)} path={mdiMenu} color='#fff' size={1.5} />
          <MenuResponsive closeDrawer={()=> setOpenDrawer(false)} openDrawer={openDrawer}/>
        </Header>
        </Affix>
        <Layout>
          <Content >

            <Component {...pageProps} />

          </Content>
          {router.pathname == '/movies/[id]' || router.pathname == '/tv/[id]'?
          '':
          <Sider theme="light"  >
           <SiderNav/>
          </Sider>}
        </Layout>
        <Footer >Footer</Footer>
      </Layout>
    </ConfigProvider>
  )
}
