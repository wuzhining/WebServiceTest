1、webservice接口的实现类需要注解@WebService、对外开放的方法需要注解@WebMethod.
2、控制台运行命令：wsgen -cp ./build/classes -s ./src -r ./wsdl -d ./build/classes -wsdl pakageName.YourServiceName 生成wsdl文件、xsd文件及jaxws包下的java类.
3、如果service中引用了json、jdbc等第三方jar包，命令台运行wsgen命令时将会报错，所以将逻辑处理、数据持久化等代码写在dao层.
4、在WEB-INF目录下的sun-jaxws.xml（没有则新建）文件配置webservice的信息.
