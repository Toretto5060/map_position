import Mock from 'mockjs'
const Random = Mock.Random

// 用户数据
const userData = () => {
  let users = []
  for (let i = 0; i < 10; i++) {
    let user = {
      'id': i + 1,
      'date': Random.date('yyyy-MM-dd'),
      'name': Random.cname(),
      'address': Mock.mock('@county(true)'),
      'phone': Mock.mock(/^1[0-9]{10}$/),
      'status': Random.integer(0, 1)
    }
    users.push(user)
  }
  return users
}

const map_data = () => {
  let data = {
    map_center:'121.504192,30.961617',
    map_zoom:18,
    plate:[],
    person:[]
  }
  let psi = [
    {name:"摄像头1",psi:"121.505515,30.963195"},
    {name:"摄像头2",psi:"121.503584,30.963032"},
    {name:"摄像头3",psi:"121.50212,30.962575"},
    {name:"摄像头4",psi:"121.502362,30.961282"},
    {name:"摄像头5",psi:"121.502614,30.960377"},
    {name:"摄像头6",psi:"121.503332,30.960446"},
    {name:"摄像头7",psi:"121.503656,30.960206"},
    {name:"摄像头8",psi:"121.504258,30.962428"},
    {name:"摄像头9",psi:"121.504231,30.961158"},
    {name:"摄像头10",psi:"121.504886,30.960942"},
    {name:"摄像头11",psi:"121.506018,30.961368"},
    {name:"摄像头12",psi:"121.506018,30.961368"},
    {name:"摄像头13",psi:"121.504997,30.960305"},
    {name:"摄像头14",psi:"121.502109,30.961078"},
    {name:"摄像头15",psi:"121.506469,30.960822"},
    {name:"摄像头16",psi:"121.506018,30.962552"},
    {name:"摄像头17",psi:"121.506661,30.961971"}
  ]

  for (let i = 0; i < 10; i++) {
    let user = {
      'id': i,
      'plate':"沪"+ Random.character('ABCDEF') + Mock.mock('@string("number", 5)'),
      'camera': psi[Random.integer(0, 16)],
    }

    data.plate.push(user)
  }
  return data
}




Mock.mock(/\/api\/v2\/index_show\/data\/1/, 'get', userData)

Mock.mock('/index/data', 'post', map_data)

export default Mock
