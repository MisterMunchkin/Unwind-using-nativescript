package com.tns.gen.android.widget;

public class ExpandableListView_OnGroupExpandListener implements android.widget.ExpandableListView.OnGroupExpandListener {
	public ExpandableListView_OnGroupExpandListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onGroupExpand(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onGroupExpand", void.class, args);
	}

}