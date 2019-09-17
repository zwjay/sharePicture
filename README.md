# sharePicture
**—— 基于ssm的图片共享网站项目**

### 1. 项目描述
这是一个基于 SSM + MySQL + thymeleaf 的图片分享网站项目；在本网站，你可以免费的下载自己喜欢的图片，在注册登录账号之后，你可以上传你想要分享的图片，供其他人下载；当你很喜欢某个用户的分享，你也可以关注这个用户...

---------

### 2. 数据库设计
+ 用户表(User)：
  + 用户ID(userId)
  + 用户名(userName)
  + 密码(password)
  + Email(email)
  + 用户头像(userHeadUrl)
+ 关注表(Followers)：
  + 用户ID(userId)
  + 粉丝ID(fansId)
+ 分类表(Type)：
  + 分类ID(typeId)
  + 分类名称(typeName)
+ 图片表(Picture)：
  + 图片ID(picId)
  + 图片描述(picDescription)
  + 图片地址(picUrl)
  + 上传时间(uploadTime)
  + 标签(tags)
  + 分类ID(typeId)
  + 用户ID(userId)
+ 图片集表(Album)：
  + 图片集ID(PicAlbumId)
  + 图片集名(PicAlbumName)
  + 创建时间(createTime)
  + 更新时间(updateTime)
  + 分类ID(typeId)
  + 用户ID(userId)
+ 收藏表(Collection):
  + 图片集ID(PicAlbumId)
  + 图片ID(picId)，
  + 收藏时间
  + 用户ID(userId)

---------------

### 3. 运行截图
![首页](https://user-images.githubusercontent.com/22737534/65038592-dd1aae80-d982-11e9-8aab-03a66c1ba648.png "首页")
![用户界面](https://user-images.githubusercontent.com/22737534/65038703-1fdc8680-d983-11e9-9693-279282c224e6.png "用户界面")
![上传图片](https://user-images.githubusercontent.com/22737534/65038797-5dd9aa80-d983-11e9-9ee7-83cb884f27b8.png "上传图片")
![下载图片](https://user-images.githubusercontent.com/22737534/65038806-6205c800-d983-11e9-9376-e9f3575cf11e.png "下载图片")
![用户信息修改](https://user-images.githubusercontent.com/22737534/65038835-6cc05d00-d983-11e9-9523-88dc63f0dd8f.png "用户信息修改")
