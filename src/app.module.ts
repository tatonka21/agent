import { NgModule, ReflectiveInjector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { Select2Module } from 'ng2-select2/ng2-select2';

import { AddOnComponent } from './components/add-on';
import { KeymapAddComponent, KeymapComponent, KeymapHeaderComponent } from './components/keymap';
import { LayersComponent } from './components/layers';
import {
    MacroActionEditorComponent,
    MacroAddComponent,
    MacroComponent,
    MacroDelayTabComponent,
    MacroHeaderComponent,
    MacroItemComponent,
    MacroKeyTabComponent,
    MacroMouseTabComponent,
    MacroTextTabComponent
} from './components/macro';
import { NotificationComponent } from './components/notification';
import { PopoverComponent } from './components/popover';
import {
    KeymapTabComponent,
    KeypressTabComponent,
    LayerTabComponent,
    MacroTabComponent,
    MouseTabComponent,
    NoneTabComponent
} from './components/popover/tab';
import { CaptureKeystrokeButtonComponent } from './components/popover/widgets/capture-keystroke';
import { IconComponent } from './components/popover/widgets/icon';
import { SettingsComponent } from './components/settings';
import { SideMenuComponent } from './components/side-menu';
import { SvgKeyboardComponent } from './components/svg/keyboard';
import {
    SvgIconTextKeyComponent,
    SvgKeyboardKeyComponent,
    SvgKeystrokeKeyComponent,
    SvgMouseClickKeyComponent,
    SvgMouseKeyComponent,
    SvgMouseMoveKeyComponent,
    SvgMouseScrollKeyComponent,
    SvgMouseSpeedKeyComponent,
    SvgOneLineTextKeyComponent,
    SvgSingleIconKeyComponent,
    SvgSwitchKeymapKeyComponent,
    SvgTextIconKeyComponent,
    SvgTwoLineTextKeyComponent
} from './components/svg/keys';
import { SvgModuleComponent } from './components/svg/module';
import { SvgKeyboardWrapComponent } from './components/svg/wrap';
import { MainAppComponent, appRoutingProviders, routing }  from './main-app';

import { DataProviderService } from './services/data-provider.service';
import { MapperService } from './services/mapper.service';
import { UhkConfigurationService } from './services/uhk-configuration.service';

import { KeymapEffects, MacroEffects } from './store/effects';
import { keymapReducer, macroReducer, presetReducer } from './store/reducers';
import { DataStorage } from './store/storage';

// Create DataStorage dependency injection
const storageProvider = ReflectiveInjector.resolve([DataStorage]);
const storageInjector = ReflectiveInjector.fromResolvedProviders(storageProvider);
const storageService: DataStorage = storageInjector.get(DataStorage);

// All reducers that are used in application
const storeConfig = {
    keymaps: storageService.saveSate(keymapReducer),
    macros: storageService.saveSate(macroReducer),
    presetKeymaps: presetReducer
};

@NgModule({
    declarations: [
        MainAppComponent,
        KeymapComponent,
        KeymapHeaderComponent,
        NotificationComponent,
        SvgIconTextKeyComponent,
        SvgKeyboardKeyComponent,
        SvgKeystrokeKeyComponent,
        SvgMouseKeyComponent,
        SvgMouseClickKeyComponent,
        SvgMouseMoveKeyComponent,
        SvgMouseScrollKeyComponent,
        SvgMouseSpeedKeyComponent,
        SvgOneLineTextKeyComponent,
        SvgSingleIconKeyComponent,
        SvgSwitchKeymapKeyComponent,
        SvgTextIconKeyComponent,
        SvgTwoLineTextKeyComponent,
        SvgKeyboardKeyComponent,
        SvgKeyboardWrapComponent,
        SvgKeyboardComponent,
        SvgModuleComponent,
        LayersComponent,
        PopoverComponent,
        KeymapAddComponent,
        SideMenuComponent,
        KeypressTabComponent,
        KeymapTabComponent,
        LayerTabComponent,
        MacroTabComponent,
        MouseTabComponent,
        NoneTabComponent,
        CaptureKeystrokeButtonComponent,
        IconComponent,
        MacroComponent,
        MacroHeaderComponent,
        MacroAddComponent,
        MacroItemComponent,
        MacroActionEditorComponent,
        MacroDelayTabComponent,
        MacroKeyTabComponent,
        MacroMouseTabComponent,
        MacroTextTabComponent,
        AddOnComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DragulaModule,
        routing,
        StoreModule.provideStore(storeConfig, storageService.initialState()),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),
        StoreLogMonitorModule,
        Select2Module,
        EffectsModule.runAfterBootstrap(KeymapEffects),
        EffectsModule.runAfterBootstrap(MacroEffects)
    ],
    providers: [
        DataProviderService,
        UhkConfigurationService,
        MapperService,
        appRoutingProviders
    ],
    bootstrap: [MainAppComponent]
})
export class AppModule { }
