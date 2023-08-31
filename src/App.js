// import logo from './logo.svg';
import './style/_all.scss';
import { useState, useEffect, use } from 'react';
import { GETFestivalList, IMageUrl } from './API/index'
import { Tabs, Row, Col } from 'antd';
import Modal from './components/Modal'
import { AiFillEnvironment } from 'react-icons/ai'

import axios from "axios"

function App() {
  const [National, setNational] = useState([])
  const [Global, setGlobal] = useState([])
  const [activeTab, setActiveTab] = useState('national')
  const { TabPane } = Tabs;
  const [Modaltest, setModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios.get(GETFestivalList)
      .then((res) => {
        if (res) {
          const filteredNational = res.data.filter(item => item.levelName === "全國級");
          const filteredGlobal = res.data.filter(item => item.levelName === "國際級");
          console.log('獲取', res.data)
          setNational(filteredNational)
          setGlobal(filteredGlobal)
        }
      })
  }

  const onTabChange = (key) => {
    setActiveTab(key)
    document.querySelector('.RowStyle').scrollTop = 0;
  }

  const handleCloseModal = () => {
    setModal(false);
    setSelectedItem(null);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setModal(true);
  };

  const maxLength = 50;

  return (
    <div className="App">
      <Tabs centered onChange={onTabChange} activeKey={activeTab} className='TabBar' type='card'>

        <TabPane tab='全國級' key='national'>
          <Row className='RowStyle' gutter={[16, 24]}>
            {National.map((item, index) => {
              const NewDescription = item.description.substring(0, maxLength);
              return (
                <Col className="CardStyle" span={6} >
                  <img alt='圖片失效' src={`${IMageUrl}${item.imageUrl}`} />
                  <div className='cardInner'>
                    <p><span>{item.actName}</span></p>
                    <div className='cardBody'>
                      <p>
                        {NewDescription}
                        {item.description.length > maxLength && <span onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }} >...更多</span>}
                      </p>
                      <p ><AiFillEnvironment /> <span> {item.cityName}</span></p>
                    </div>
                  </div>
                </Col>
              )
            })}

          </Row>
        </TabPane>
        <TabPane tab='國際級' key='global'>
          <Row className='RowStyle' gutter={[16, 24]} >
            {Global.map((item, index) => {
              const NewDescription = item.description.substring(0, maxLength);
              return (
                <Col className="CardStyle" span={6} >
                  <img alt='圖片失效' src={`${IMageUrl}${item.imageUrl}`} />
                  <div className='cardInner'>
                    <p><span>{item.actName}</span></p>
                    <div >
                      <p>
                        {NewDescription}
                        {item.description.length > maxLength && <span onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>...更多</span>}
                      </p>
                      <p><AiFillEnvironment /> <span> {item.cityName}</span></p>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </TabPane>
      </Tabs>


      <Modal visible={Modaltest} >
        {selectedItem && (
          <div className='modalBody' >
            <img src={`${IMageUrl}${selectedItem.imageUrl}`} />
            <div className='cardInner'>
              <p>{selectedItem.actName}</p>
              <div >
                <p style={{ textAlign: 'left' }}>
                  <p>{selectedItem.description}</p>
                </p>
              </div>
            </div>
            <div className='closeButton' onClick={handleCloseModal}>Close</div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
