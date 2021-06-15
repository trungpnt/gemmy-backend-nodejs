
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import * as React from 'react';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.closeClick = this.closeClick.bind(this);
        this.openClick = this.openClick.bind(this);
        this.toggleClick = this.toggleClick.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }
    onCreate() {
        this.sidebarObj.element.style.visibility = '';
    }
    open() {
        console.log("Sidebar is opened");
    }
    close() {
        console.log("Sidebar is closed");
    }
    // Open the Sidebar
    openClick() {
        this.sidebarObj.show();
    }
    // Toggle(Open/Close) the Sidebar
    toggleClick() {
        this.sidebarObj.toggle();
    }
    // Close the Sidebar
    closeClick() {
        this.sidebarObj.hide();
    }
    render() {
        return (<div className="control-section">
                <div id="wrapper">
                    
                    <SidebarComponent id="default-sidebar" ref={Sidebar => this.sidebarObj = Sidebar} style={{ visibility: "hidden" }} close={this.close} open={this.open} created={this.onCreate}>
                        <div className="title"> Sidebar content</div>
                        <div className="sub-title">
                            Click the button to close the Sidebar.
                         </div>
                        <div className="center-align">
                            <ButtonComponent onClick={this.closeClick} id="close" className="e-btn close-btn">Close Sidebar</ButtonComponent>
                        </div>
                    </SidebarComponent>
                    <div>
                        <div className="title">Main content</div>
                        <div className="sub-title"> Click the button to Open the Sidebar.</div>
                        <div className="center-align">
                            <ButtonComponent onClick={this.openClick} id="open" className="e-btn e-info">Open Sidebar</ButtonComponent>
                        </div>
                        <div className="sub-title"> Click the button to open/close the Sidebar.</div>
                        <div className="center-align">
                            <ButtonComponent onClick={this.toggleClick} id="toggle" className="e-btn e-info">Toggle Sidebar</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>);
    }
}