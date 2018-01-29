const TabsViewModel = require("./tabs-view-model");
var page;
/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize data for the whole tab
* navigation layout as a whole.
*************************************************************/
var tabView;
function onNavigatingTo(args) {
    /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
    
    if (args.isBackNavigation) {
        
        return;
    }
    

    const page = args.object;

  /*  tabView = page.getViewById("tabview");
    
    tabView.selectedIndex = 1;*/

    //tabView = page.getViewById("tabview")
    //tabView.selectedIndex = global.activeTab;

    page.bindingContext = new TabsViewModel();
}

/* ***********************************************************
 * Get the current tab view title and set it as an ActionBar title.
 * Learn more about the onSelectedIndexChanged event here:
 * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
 *************************************************************/
function onSelectedIndexChanged(args) {
    const tabView = args.object;
    const bindingContext = tabView.bindingContext;
    const selectedTabViewItem = tabView.items[args.newIndex];

    global.activeTab = args.newIndex;
    //const selectedTabViewItem = tabView.items[2];
    bindingContext.set("title", selectedTabViewItem.title);
   // console.log("TAB INDEX: " + args.newIndex);
    global.activeTab = args.newIndex;
}

exports.onSelectedIndexChanged = onSelectedIndexChanged;
exports.onNavigatingTo = onNavigatingTo;
exports.backEvent = function(args){

    args.cancel = true;

}
