package com.tns.gen.javax.net.ssl;

public class HostnameVerifier implements javax.net.ssl.HostnameVerifier {
	public HostnameVerifier() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean verify(java.lang.String param_0, javax.net.ssl.SSLSession param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "verify", boolean.class, args);
	}

}
