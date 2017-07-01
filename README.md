# Wecanmobile

创投管理平台客户端，采用`react-native`技术，整合了`redux`, `saga`, `apisauce`, `native-base`, `微信登录`等模块。持续更新中。

## 安装

```
npm install
brew update
brew install watchman
brew cask install reactotron
npm install -g react-native-cli
```

## 开发环境

* [Reactotron](https://github.com/infinitered/reactotron)
* [Atom](https://atom.io/)
* [Nuclide](https://nuclide.io/)

因为我们并非全局安装flow，所以还需要在Atom的Preference -> Packages -> Nuclide -> Settings -> Nuclide-flow勾选Use the Flow binary included in each project's flow-bin。

## 调试

调试iOS
```
react-native run-ios
```

调试Android，需要先创建一个名为`android60`的虚拟机。
```
./start-android
react-native run-android
```
