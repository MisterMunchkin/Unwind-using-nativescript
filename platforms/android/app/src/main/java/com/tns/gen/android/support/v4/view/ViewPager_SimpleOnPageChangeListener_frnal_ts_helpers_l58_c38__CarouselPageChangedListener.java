package com.tns.gen.android.support.v4.view;

public class ViewPager_SimpleOnPageChangeListener_frnal_ts_helpers_l58_c38__CarouselPageChangedListener extends android.support.v4.view.ViewPager.SimpleOnPageChangeListener implements com.tns.NativeScriptHashCodeProvider {
	public ViewPager_SimpleOnPageChangeListener_frnal_ts_helpers_l58_c38__CarouselPageChangedListener(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onPageSelected(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onPageSelected", void.class, args);
	}

	public void onPageScrollStateChanged(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onPageScrollStateChanged", void.class, args);
	}

	public void onPageScrolled(int param_0, float param_1, int param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onPageScrolled", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
