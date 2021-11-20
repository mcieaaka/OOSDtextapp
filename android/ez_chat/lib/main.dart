import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: WebView(
          initialUrl: "https://www.praveencsrivastava.com/", //My dad's website
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    ),
  );
}
