/**
 * Copyright 2024 Vmagz807
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character";
import "wired-elements";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    
    this.characterSettings = {
      seed: "00000000",
      base: 0, 
      mouth: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      glasses: false,
      hatColor: 0,
      size: 200,
      fire: false,
      walking: false,
    };
  }

  static get properties() {
    return {
      ...super.properties,
      characterSettings: { type: Object },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-wrap: wrap;
        gap: var(--ddd-spacing-5);
        justify-content: center;
        padding: var(--ddd-spacing-5);
      }

      .characterDisplay {
        flex: 1;
        min-width: 300px;
        text-align: center;
        position: relative;
      }

      .characterDisplay rpg-character {
        height: var(--character-size, 200px);
        width: var(--character-size, 200px);
      }

      .customizationControls {
        margin-top: var(--ddd-spacing-12);
        margin-right: var(--ddd-spacing-10);
        min-width: 300px;
        text-align: left;
      } 

      wired-checkbox {
        margin-top: var(--ddd-spacing-5);
        cursor: pointer;
        color: white;
      }
      
      wired-slider{
        --wired-slider-knob-color: green;
        --wired-slider-bar-color: white;
      }

      wired-checkbox, wired-slider{
        display: block;
        margin-bottom: var(--ddd-spacing-4);
        max-width: 300px;
        
      }

      label {
        display: block;
        font-size: var(--ddd-font-size-lg);
        font-weight: bold;
        margin-bottom: var(--ddd-spacing-1);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
    
      <div class="container">
        <div class="characterDisplay">

          <!-- Styles from @haxtheweb/rpg-character -->
          <rpg-character
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceitem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            hatColor="${this.characterSettings.hatColor}"
            .fire="${this.characterSettings.fire}"
            .walking="${this.characterSettings.walking}"
            style="--character-size: ${this.characterSettings.size}px;
                   --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);">
          </rpg-character>

        </div>

        <!-- All Controls for customizing character -->
        <div class="customizationControls">

          <!-- Checkbox for hair on character 0 for no 1 for yes-->
          <label for="hairToggle">Hair:</label>
          <wired-checkbox

            id="hairToggle"
            ?checked="${this.characterSettings.base === 1}"
            @change="${(e) => this.updateSetting('base', e.target.checked ? 1 : 0)}"> 

              Has Hair
          
          </wired-checkbox>

          <!-- Adds hair slider if hair is checked to be on. -->
          ${this.characterSettings.base === 1 ? html`

            <!-- Slider for what hair color user wants -->
            <label for="hair">Hair Color:</label>
            <wired-slider

              id="hair"
              value="${this.characterSettings.hair}"
              min="0"
              max="9"
              @change="${(e) => this.updateSetting('hair', parseInt(e.detail.value))}">

            </wired-slider>
          ` : ''}

          <!-- Slider for size of character ranging from 100-400px -->
          <label for="size">Character Size:</label>
          <wired-slider

            id="size"
            value="${this.characterSettings.size}"
            min="100"
            max="400"
            @change="${(e) => this.updateSetting('size', parseInt(e.detail.value))}">
          
          </wired-slider>
        
          <!-- Slider for what face to use for character -->
          <label for="face">Face:</label>
          <wired-slider

            id="face"
            value="${this.characterSettings.face}"
            min="0"
            max="5"
            @change="${(e) => this.updateSetting('face', parseInt(e.detail.value))}">

          </wired-slider>

          <!-- Slider for eyewear used on character-->
          <label for="faceitem">Eyewear:</label>
          <wired-slider 

            id="faceitem"
            value="${this.characterSettings.faceitem}"
            min="0"
            max="9"
            @change="${(e) => this.updateSetting('faceitem', parseInt(e.detail.value))}">

          </wired-slider>


          <!-- Slider for what type of pants user wants -->
          <label for="pants">Pants Style:</label>
          <wired-slider
            id="pants"
            value="${this.characterSettings.pants}"
            min="0"
            max="9"
            @change="${(e) => this.updateSetting('pants', parseInt(e.detail.value))}">
        
          </wired-slider>

          <!-- Slider for what type of shirt user wants -->
          <label for="shirt">Shirt Style:</label>
          <wired-slider
            id="shirt"
            value="${this.characterSettings.shirt}"
            min="0"
            max="9"
            @change="${(e) => this.updateSetting('shirt', parseInt(e.detail.value))}">
        
          </wired-slider>

          <!-- Slider for skin color of character -->
          <label for="skin">Skin Color:</label>
          <wired-slider
            id="skin"
            value="${this.characterSettings.skin}"
            min="0"
            max="9"
            @change="${(e) => this.updateSetting('skin', parseInt(e.detail.value))}">
        
          </wired-slider>

          <!-- Slider for the color of the hat -->
          <label for="hatColor">Hat Color:</label>
          <wired-slider
            id="hatColor"
            value="${this.characterSettings.hatColor}"
            min="0"
            max="9"
            @change="${(e) => this.updateSetting('hatColor', parseInt(e.detail.value))}">
        
          </wired-slider>

          <!-- Checkbox for fire yes or no -->
          <wired-checkbox
            ?checked="${this.characterSettings.fire}"
            @change="${(e) => this.updateSetting('fire', e.target.checked)}">

            Ring of Fire

          </wired-checkbox>

          <!-- Checkbox for walking yes or no -->
          <wired-checkbox
            ?checked="${this.characterSettings.walking}"
            @change="${(e) => this.updateSetting('walking', e.target.checked)}">
            
            Toggle Walk
        
          </wired-checkbox>

        </div>
      </div>
  
  `;
  }

  //Method to generate seed based off selected items and traits
  generateSeed() {

    const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterSettings;
    this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}}`;
  }

  //Method that updated character settings to allow for live display of character
  updateSetting(key, value) {

    this.characterSettings = { ...this.characterSettings, [key]: value };
    this.generateSeed();
  }
  
}

globalThis.customElements.define(RpgMe.tag, RpgMe);