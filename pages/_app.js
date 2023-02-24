import { Layout, ConfigProvider, Affix } from "antd"
import 'antd/dist/reset.css';
import '../styles/globals.scss'
import Search from '../components/Search'
import { useRouter } from "next/router";
import Nav from '../components/nav'
import Link from "next/link";
import SiderNav from "../components/SiderNav";
const { Header, Footer, Sider, Content, } = Layout;
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const onSearch = (valor) => {
  
    valor != '' ?
      router.push('/search/' + valor) :
      ''

  }

  return (
    <ConfigProvider

    >
      <Layout >
        <Affix offsetTop={0}>
        <Header  >
          <Link href={'/'}><span className="Title_Header">NEXTMOVIE</span></Link>
          <Nav />
          <Search onSearch={onSearch} />
        </Header>
        </Affix>
        <Layout>
          <Content >

            <Component {...pageProps} />

          </Content>
          {router.pathname == '/movies/[id]' || router.pathname == '/tv/[id]'?
          '':
          <Sider theme="light" width={410} >
           <SiderNav/>
          </Sider>}
        </Layout>
        <Footer >Footer</Footer>
      </Layout>
    </ConfigProvider>
  )
}
