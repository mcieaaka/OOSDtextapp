import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: WebView(
          initialUrl:
              "http://ec2-13-235-246-55.ap-south-1.compute.amazonaws.com:3000/", //My dad's website
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    ),
  );
}
