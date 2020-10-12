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
  let psi = [ {
			"ID":	0,
			"DeviceName":	"东门1a摄像头",
      "DeviceAddress":	"新民港路888号","Location":"121.476075,30.992932","CameraType":0,"DeviceAddress":'平阳路1'
		}, {
			"ID":	1,
			"DeviceName":	"西门摄像b头",
			"DeviceAddress":	"新民港路188号","Location":"121.477036,30.995386","CameraType":1,"DeviceAddress":'平阳路2'
		}, {
			"ID":	2,
			"DeviceName":	"南门摄x像头",
			"DeviceAddress":	"新民港路288号","Location":"121.480971,30.99643","CameraType":1,"DeviceAddress":'平阳路3'
		}, {
			"ID":	3,
			"DeviceName":	"北x门摄像头",
			"DeviceAddress":	"新民港路388号","Location":"121.478537,30.993497","CameraType":0,"DeviceAddress":'平阳路4'
		}
  ]

  let data = {
    map_center:'121.47815,30.994207',
    map_zoom:18,
    data:psi
  }


  return data
}




Mock.mock(/\/api\/v2\/index_show\/data\/1/, 'get', userData)

Mock.mock('/index/data', 'post', map_data)

export default Mock
