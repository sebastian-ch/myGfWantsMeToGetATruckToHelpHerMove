import{n as N}from"./glsl-BH37Aalp.js";import{dC as C,gw as Fe,ez as Ue,b9 as Ge,lv as Ee,lw as je,lx as He,kG as Le,al as _e,ly as Be,lz as ke,lA as qe,lB as Xe,lC as Ze,lD as Ye,hE as Qe,em as ie,e2 as j,d$ as z,e1 as ee,e5 as F,e4 as V,dY as B,ek as Je,e0 as Ae,dZ as Ke,dX as Te}from"./index-D3fyoxzI.js";import{t as We}from"./doublePrecisionUtils-B0owpBza.js";import{s as et,a as tt,c as nt,o as Ie,e as ot,g as Oe,h as rt,p as st,w as at,i as lt,j as it,k as ct,n as G,f as E,l as Re,m as Pe}from"./Geometry-CegbLhTL.js";import{e as x}from"./VertexAttribute-Cq4MnHjR.js";import{e as ut}from"./mat4f64-Dk4dwAN8.js";import{s as ft}from"./vec42-ZezAD1mB.js";import{t as ht,N as pt}from"./vec4f64-o2zAXfmz.js";import{u as dt}from"./meshVertexSpaceUtils-DCR18GFd.js";import{e as xe}from"./projectVectorToVector-BoXuJ0yP.js";import{o as mt,x as wt}from"./hydratedFeatures-F0PkG9rE.js";import{r as I,t as Me,n as U}from"./vec3f32-nZdmKIgz.js";import{o as gt,w as Ce}from"./Indices-OcdtxkBn.js";import{M as Ot,l as vt,x as xt}from"./plane-CN_QOGVH.js";import{k as yt}from"./sphere-Ct1UTEHW.js";import{t as S}from"./orientedBoundingBox-DpFI2Nlh.js";import{s as te}from"./InterleavedLayout-CHo_FBMI.js";function on(e){e.code.add(N`const float MAX_RGBA_FLOAT =
255.0 / 256.0 +
255.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 +
255.0 / 256.0 / 256.0 / 256.0 / 256.0;
const vec4 FIXED_POINT_FACTORS = vec4(1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0);
vec4 float2rgba(const float value) {
float valueInValidDomain = clamp(value, 0.0, MAX_RGBA_FLOAT);
vec4 fixedPointU8 = floor(fract(valueInValidDomain * FIXED_POINT_FACTORS) * 256.0);
const float toU8AsFloat = 1.0 / 255.0;
return fixedPointU8 * toU8AsFloat;
}`),e.code.add(N`const vec4 RGBA_TO_FLOAT_FACTORS = vec4(
255.0 / (256.0),
255.0 / (256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0),
255.0 / (256.0 * 256.0 * 256.0 * 256.0)
);
float rgbaTofloat(vec4 rgba) {
return dot(rgba, RGBA_TO_FLOAT_FACTORS);
}`),e.code.add(N`const vec4 uninterpolatedRGBAToFloatFactors = vec4(
1.0 / 256.0,
1.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0,
1.0 / 256.0 / 256.0 / 256.0 / 256.0
);
float uninterpolatedRGBAToFloat(vec4 rgba) {
return (dot(round(rgba * 255.0), uninterpolatedRGBAToFloatFactors) - 0.5) * 2.0;
}`)}function rn(e,n){return e==null&&(e=[]),e.push(n),e}function sn(e,n){if(e==null)return null;const o=e.filter(t=>t!==n);return o.length===0?null:o}function an(e,n,o,t,r){oe[0]=e.get(n,0),oe[1]=e.get(n,1),oe[2]=e.get(n,2),We(oe,k,3),o.set(r,0,k[0]),t.set(r,0,k[1]),o.set(r,1,k[2]),t.set(r,1,k[3]),o.set(r,2,k[4]),t.set(r,2,k[5])}const oe=C(),k=new Float32Array(6),At=.5;function ln(e,n){e.include(et),e.attributes.add(x.POSITION,"vec3"),e.attributes.add(x.NORMAL,"vec3"),e.attributes.add(x.CENTEROFFSETANDDISTANCE,"vec4");const o=e.vertex;tt(o,n),nt(o,n),o.uniforms.add(new Ie("viewport",t=>t.camera.fullViewport),new ot("polygonOffset",t=>t.shaderPolygonOffset),new Oe("cameraGroundRelative",t=>t.camera.aboveGround?1:-1)),n.hasVerticalOffset&&rt(o),o.constants.add("smallOffsetAngle","float",.984807753012208),o.code.add(N`struct ProjectHUDAux {
vec3 posModel;
vec3 posView;
vec3 vnormal;
float distanceToCamera;
float absCosAngle;
};`),o.code.add(N`
    float applyHUDViewDependentPolygonOffset(float pointGroundDistance, float absCosAngle, inout vec3 posView) {
      float pointGroundSign = ${n.terrainDepthTest?N.float(0):N`sign(pointGroundDistance)`};
      if (pointGroundSign == 0.0) {
        pointGroundSign = cameraGroundRelative;
      }

      // cameraGroundRelative is -1 if camera is below ground, 1 if above ground
      // groundRelative is 1 if both camera and symbol are on the same side of the ground, -1 otherwise
      float groundRelative = cameraGroundRelative * pointGroundSign;

      // view angle dependent part of polygon offset emulation: we take the absolute value because the sign that is
      // dropped is instead introduced using the ground-relative position of the symbol and the camera
      if (polygonOffset > .0) {
        float cosAlpha = clamp(absCosAngle, 0.01, 1.0);
        float tanAlpha = sqrt(1.0 - cosAlpha * cosAlpha) / cosAlpha;
        float factor = (1.0 - tanAlpha / viewport[2]);

        // same side of the terrain
        if (groundRelative > 0.0) {
          posView *= factor;
        }
        // opposite sides of the terrain
        else {
          posView /= factor;
        }
      }

      return groundRelative;
    }
  `),n.draped&&!n.hasVerticalOffset||st(o),n.draped||(o.uniforms.add(new Oe("perDistancePixelRatio",t=>Math.tan(t.camera.fovY/2)/(t.camera.fullViewport[2]/2))),o.code.add(N`
    void applyHUDVerticalGroundOffset(vec3 normalModel, inout vec3 posModel, inout vec3 posView) {
      float distanceToCamera = length(posView);

      // Compute offset in world units for a half pixel shift
      float pixelOffset = distanceToCamera * perDistancePixelRatio * ${N.float(At)};

      // Apply offset along normal in the direction away from the ground surface
      vec3 modelOffset = normalModel * cameraGroundRelative * pixelOffset;

      // Apply the same offset also on the view space position
      vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;

      posModel += modelOffset;
      posView += viewOffset;
    }
  `)),n.screenCenterOffsetUnitsEnabled&&at(o),n.hasScreenSizePerspective&&lt(o),o.code.add(N`
    vec4 projectPositionHUD(out ProjectHUDAux aux) {
      vec3 centerOffset = centerOffsetAndDistance.xyz;
      float pointGroundDistance = centerOffsetAndDistance.w;

      aux.posModel = position;
      aux.posView = (view * vec4(aux.posModel, 1.0)).xyz;
      aux.vnormal = normal;
      ${n.draped?"":"applyHUDVerticalGroundOffset(aux.vnormal, aux.posModel, aux.posView);"}

      // Screen sized offset in world space, used for example for line callouts
      // Note: keep this implementation in sync with the CPU implementation, see
      //   - MaterialUtil.verticalOffsetAtDistance
      //   - HUDMaterial.applyVerticalOffsetTransformation

      aux.distanceToCamera = length(aux.posView);

      vec3 viewDirObjSpace = normalize(cameraPosition - aux.posModel);
      float cosAngle = dot(aux.vnormal, viewDirObjSpace);

      aux.absCosAngle = abs(cosAngle);

      ${n.hasScreenSizePerspective&&(n.hasVerticalOffset||n.screenCenterOffsetUnitsEnabled)?"vec3 perspectiveFactor = screenSizePerspectiveScaleFactor(aux.absCosAngle, aux.distanceToCamera, screenSizePerspectiveAlignment);":""}

      ${n.hasVerticalOffset?n.hasScreenSizePerspective?"float verticalOffsetScreenHeight = applyScreenSizePerspectiveScaleFactorFloat(verticalOffset.x, perspectiveFactor);":"float verticalOffsetScreenHeight = verticalOffset.x;":""}

      ${n.hasVerticalOffset?N`
            float worldOffset = clamp(verticalOffsetScreenHeight * verticalOffset.y * aux.distanceToCamera, verticalOffset.z, verticalOffset.w);
            vec3 modelOffset = aux.vnormal * worldOffset;
            aux.posModel += modelOffset;
            vec3 viewOffset = (viewNormal * vec4(modelOffset, 1.0)).xyz;
            aux.posView += viewOffset;
            // Since we elevate the object, we need to take that into account
            // in the distance to ground
            pointGroundDistance += worldOffset;`:""}

      float groundRelative = applyHUDViewDependentPolygonOffset(pointGroundDistance, aux.absCosAngle, aux.posView);

      ${n.screenCenterOffsetUnitsEnabled?"":N`
            // Apply x/y in view space, but z in screen space (i.e. along posView direction)
            aux.posView += vec3(centerOffset.x, centerOffset.y, 0.0);

            // Same material all have same z != 0.0 condition so should not lead to
            // branch fragmentation and will save a normalization if it's not needed
            if (centerOffset.z != 0.0) {
              aux.posView -= normalize(aux.posView) * centerOffset.z;
            }
          `}

      vec4 posProj = proj * vec4(aux.posView, 1.0);

      ${n.screenCenterOffsetUnitsEnabled?n.hasScreenSizePerspective?"float centerOffsetY = applyScreenSizePerspectiveScaleFactorFloat(centerOffset.y, perspectiveFactor);":"float centerOffsetY = centerOffset.y;":""}

      ${n.screenCenterOffsetUnitsEnabled?"posProj.xy += vec2(centerOffset.x, centerOffsetY) * pixelRatio * 2.0 / viewport.zw * posProj.w;":""}

      // constant part of polygon offset emulation
      posProj.z -= groundRelative * polygonOffset * posProj.w;
      return posProj;
    }
  `)}function Pt(e){e.uniforms.add(new it("alignPixelEnabled",n=>n.alignPixelEnabled)),e.code.add(N`vec4 alignToPixelCenter(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.500123) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = (floor(xy * widthHeight) + vec2(0.5)) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`),e.code.add(N`vec4 alignToPixelOrigin(vec4 clipCoord, vec2 widthHeight) {
if (!alignPixelEnabled)
return clipCoord;
vec2 xy = vec2(0.5) + 0.5 * clipCoord.xy / clipCoord.w;
vec2 pixelSz = vec2(1.0) / widthHeight;
vec2 ij = floor((xy + 0.5 * pixelSz) * widthHeight) * pixelSz;
vec2 result = (ij * 2.0 - vec2(1.0)) * clipCoord.w;
return vec4(result, clipCoord.zw);
}`)}var ce;(function(e){e[e.Occluded=0]="Occluded",e[e.NotOccluded=1]="NotOccluded",e[e.Both=2]="Both",e[e.COUNT=3]="COUNT"})(ce||(ce={}));function cn(e){e.vertex.uniforms.add(new Oe("renderTransparentlyOccludedHUD",n=>n.hudRenderStyle===ce.Occluded?1:n.hudRenderStyle===ce.NotOccluded?0:.75),new Ie("viewport",n=>n.camera.fullViewport),new ct("hudVisibilityTexture",n=>{var o;return(o=n.hudVisibility)==null?void 0:o.getTexture()})),e.vertex.include(Pt),e.vertex.code.add(N`bool testHUDVisibility(vec4 posProj) {
vec4 posProjCenter = alignToPixelCenter(posProj, viewport.zw);
vec4 occlusionPixel = texture(hudVisibilityTexture, .5 + .5 * posProjCenter.xy / posProjCenter.w);
if (renderTransparentlyOccludedHUD > 0.5) {
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g * renderTransparentlyOccludedHUD < 1.0;
}
return occlusionPixel.r * occlusionPixel.g > 0.0 && occlusionPixel.g == 1.0;
}`)}function un(e,n){if(e.type==="point")return _(e,n,!1);if(mt(e))switch(e.type){case"extent":return _(e.center,n,!1);case"polygon":return _(e.centroid,n,!1);case"polyline":return _($e(e),n,!0);case"mesh":return _(dt(e.vertexSpace,e.spatialReference)??e.extent.center,n,!1);case"multipoint":return}else switch(e.type){case"extent":return _(Mt(e),n,!0);case"polygon":return _($t(e),n,!0);case"polyline":return _($e(e),n,!0);case"multipoint":return}}function $e(e){const n=e.paths[0];if(!n||n.length===0)return null;const o=je(n,He(n)/2);return xe(o[0],o[1],o[2],e.spatialReference)}function Mt(e){return xe(.5*(e.xmax+e.xmin),.5*(e.ymax+e.ymin),e.zmin!=null&&e.zmax!=null&&isFinite(e.zmin)&&isFinite(e.zmax)?.5*(e.zmax+e.zmin):void 0,e.spatialReference)}function $t(e){const n=e.rings[0];if(!n||n.length===0)return null;const o=Le(e.rings,!!e.hasZ);return xe(o[0],o[1],o[2],e.spatialReference)}function _(e,n,o){const t=o?e:wt(e);return n&&e?Ee(e,t,n)?t:null:t}function fn(e,n,o,t=0){if(e){n||(n=Ge());const r=e;let f=.5*r.width*(o-1),s=.5*r.height*(o-1);return r.width<1e-7*r.height?f+=s/20:r.height<1e-7*r.width&&(s+=f/20),ft(n,r.xmin-f-t,r.ymin-s-t,r.xmax+f+t,r.ymax+s+t),n}return null}function hn(e,n,o=null){const t=ht(pt);return e!=null&&(t[0]=e[0],t[1]=e[1],t[2]=e[2]),n!=null?t[3]=n:e!=null&&e.length>3&&(t[3]=e[3]),o&&(t[0]*=o,t[1]*=o,t[2]*=o,t[3]*=o),t}function pn(e=Fe,n,o,t=1){const r=new Array(3);if(n==null||o==null)r[0]=1,r[1]=1,r[2]=1;else{let f,s=0;for(let l=2;l>=0;l--){const c=e[l],a=c!=null,i=l===0&&!f&&!a,p=o[l];let y;c==="symbol-value"||i?y=p!==0?n[l]/p:1:a&&c!=="proportional"&&isFinite(c)&&(y=p!==0?c/p:1),y!=null&&(r[l]=y,f=y,s=Math.max(s,Math.abs(y)))}for(let l=2;l>=0;l--)r[l]==null?r[l]=f:r[l]===0&&(r[l]=.001*s)}for(let f=2;f>=0;f--)r[f]/=t;return Ue(r)}function St(e){return e.isPrimitive!=null}function dn(e){return bt(St(e)?[e.width,e.depth,e.height]:e)?null:"Symbol sizes may not be negative values"}function bt(e){const n=o=>o==null||o>=0;return Array.isArray(e)?e.every(n):n(e)}function mn(e,n,o,t=ut()){return e&&Xe(t,t,-e/180*Math.PI),n&&Ze(t,t,n/180*Math.PI),o&&Ye(t,t,o/180*Math.PI),t}function wn(e,n,o){if(o.minDemResolution!=null)return o.minDemResolution;const t=_e(n),r=Be(e)*t,f=ke(e)*t,s=qe(e)*(n.isGeographic?1:t);return r===0&&f===0&&s===0?o.minDemResolutionForPoints:.01*Math.max(r,f,s)}var ve;(function(e){function n(s,l){const c=s[l],a=s[l+1],i=s[l+2];return Math.sqrt(c*c+a*a+i*i)}function o(s,l){const c=s[l],a=s[l+1],i=s[l+2],p=1/Math.sqrt(c*c+a*a+i*i);s[l]*=p,s[l+1]*=p,s[l+2]*=p}function t(s,l,c){s[l]*=c,s[l+1]*=c,s[l+2]*=c}function r(s,l,c,a,i,p=l){(i=i||s)[p]=s[l]+c[a],i[p+1]=s[l+1]+c[a+1],i[p+2]=s[l+2]+c[a+2]}function f(s,l,c,a,i,p=l){(i=i||s)[p]=s[l]-c[a],i[p+1]=s[l+1]-c[a+1],i[p+2]=s[l+2]-c[a+2]}e.length=n,e.normalize=o,e.scale=t,e.add=r,e.subtract=f})(ve||(ve={}));const X=ve,de=[[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5],[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5]],Tt=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],It=[0,0,1,0,1,1,0,1],Rt=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],Ne=new Array(36);for(let e=0;e<6;e++)for(let n=0;n<6;n++)Ne[6*e+n]=e;const q=new Array(36);for(let e=0;e<6;e++)q[6*e]=0,q[6*e+1]=1,q[6*e+2]=2,q[6*e+3]=2,q[6*e+4]=3,q[6*e+5]=0;function gn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(24);for(let t=0;t<8;t++)o[3*t]=de[t][0]*n[0],o[3*t+1]=de[t][1]*n[1],o[3*t+2]=de[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Rt,3,!0)],[x.NORMAL,new S(Tt,Ne,3)],[x.UV0,new S(It,q,2)]])}const me=[[-.5,0,-.5],[.5,0,-.5],[.5,0,.5],[-.5,0,.5],[0,-.5,0],[0,.5,0]],Ct=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],Nt=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],zt=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];function On(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(18);for(let t=0;t<6;t++)o[3*t]=me[t][0]*n[0],o[3*t+1]=me[t][1]*n[1],o[3*t+2]=me[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Nt,3,!0)],[x.NORMAL,new S(Ct,zt,3)]])}const re=I(-.5,0,-.5),se=I(.5,0,-.5),ae=I(0,0,.5),le=I(0,.5,0),Z=U(),Y=U(),J=U(),K=U(),W=U();j(Z,re,le),j(Y,re,se),B(J,Z,Y),z(J,J),j(Z,se,le),j(Y,se,ae),B(K,Z,Y),z(K,K),j(Z,ae,le),j(Y,ae,re),B(W,Z,Y),z(W,W);const we=[re,se,ae,le],Dt=[0,-1,0,J[0],J[1],J[2],K[0],K[1],K[2],W[0],W[1],W[2]],Vt=[0,1,2,3,1,0,3,2,1,3,0,2],Ft=[0,0,0,1,1,1,2,2,2,3,3,3];function vn(e,n){Array.isArray(n)||(n=[n,n,n]);const o=new Array(12);for(let t=0;t<4;t++)o[3*t]=we[t][0]*n[0],o[3*t+1]=we[t][1]*n[1],o[3*t+2]=we[t][2]*n[2];return new E(e,[[x.POSITION,new S(o,Vt,3,!0)],[x.NORMAL,new S(Dt,Ft,3)]])}function xn(e,n,o,t,r={uv:!0}){const f=-Math.PI,s=2*Math.PI,l=-Math.PI/2,c=Math.PI,a=Math.max(3,Math.floor(o)),i=Math.max(2,Math.floor(t)),p=(a+1)*(i+1),y=G(3*p),P=G(3*p),A=G(2*p),g=[];let h=0;for(let w=0;w<=i;w++){const T=[],u=w/i,M=l+u*c,$=Math.cos(M);for(let R=0;R<=a;R++){const H=R/a,O=f+H*s,D=Math.cos(O)*$,b=Math.sin(M),ne=-Math.sin(O)*$;y[3*h]=D*n,y[3*h+1]=b*n,y[3*h+2]=ne*n,P[3*h]=D,P[3*h+1]=b,P[3*h+2]=ne,A[2*h]=H,A[2*h+1]=u,T.push(h),++h}g.push(T)}const m=new Array;for(let w=0;w<i;w++)for(let T=0;T<a;T++){const u=g[w][T],M=g[w][T+1],$=g[w+1][T+1],R=g[w+1][T];w===0?(m.push(u),m.push($),m.push(R)):w===i-1?(m.push(u),m.push(M),m.push($)):(m.push(u),m.push(M),m.push($),m.push($),m.push(R),m.push(u))}const d=[[x.POSITION,new S(y,m,3,!0)],[x.NORMAL,new S(P,m,3,!0)]];return r.uv&&d.push([x.UV0,new S(A,m,2,!0)]),r.offset&&(d[0][0]=x.OFFSET,d.push([x.POSITION,new S(Float64Array.from(r.offset),Ce(m.length),3,!0)])),new E(e,d)}function yn(e,n,o,t){const r=Ut(n,o);return new E(e,r)}function Ut(e,n,o){let t,r;t=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],r=[0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1];for(let c=0;c<t.length;c+=3)X.scale(t,c,e/X.length(t,c));let f={};function s(c,a){c>a&&([c,a]=[a,c]);const i=c.toString()+"."+a.toString();if(f[i])return f[i];let p=t.length;return t.length+=3,X.add(t,3*c,t,3*a,t,p),X.scale(t,p,e/X.length(t,p)),p/=3,f[i]=p,p}for(let c=0;c<n;c++){const a=r.length,i=new Array(4*a);for(let p=0;p<a;p+=3){const y=r[p],P=r[p+1],A=r[p+2],g=s(y,P),h=s(P,A),m=s(A,y),d=4*p;i[d]=y,i[d+1]=g,i[d+2]=m,i[d+3]=P,i[d+4]=h,i[d+5]=g,i[d+6]=A,i[d+7]=m,i[d+8]=h,i[d+9]=g,i[d+10]=h,i[d+11]=m}r=i,f={}}const l=Pe(t);for(let c=0;c<l.length;c+=3)X.normalize(l,c);return[[x.POSITION,new S(Pe(t),r,3,!0)],[x.NORMAL,new S(l,r,3,!0)]]}function An(e,n={}){const{normal:o,position:t,color:r,rotation:f,size:s,centerOffsetAndDistance:l,uvs:c,featureAttribute:a,objectAndLayerIdColor:i=null}=n,p=t?Ae(t):C(),y=o?Ae(o):Ke(0,0,1),P=r?[255*r[0],255*r[1],255*r[2],r.length>3?255*r[3]:255]:[255,255,255,255],A=s!=null&&s.length===2?s:[1,1],g=f!=null?[f]:[0],h=Ce(1),m=[[x.POSITION,new S(p,h,3,!0)],[x.NORMAL,new S(y,h,3,!0)],[x.COLOR,new S(P,h,4,!0)],[x.SIZE,new S(A,h,2)],[x.ROTATION,new S(g,h,1,!0)]];if(c&&m.push([x.UV0,new S(c,h,c.length)]),l!=null){const d=[l[0],l[1],l[2],l[3]];m.push([x.CENTEROFFSETANDDISTANCE,new S(d,h,4)])}if(a){const d=[a[0],a[1],a[2],a[3]];m.push([x.FEATUREATTRIBUTE,new S(d,h,4)])}return new E(e,m,null,Re.Point,i)}function Gt(e,n,o,t,r=!0,f=!0){let s=0;const l=n,c=e;let a=I(0,s,0),i=I(0,s+c,0),p=I(0,-1,0),y=I(0,1,0);t&&(s=c,i=I(0,0,0),a=I(0,s,0),p=I(0,1,0),y=I(0,-1,0));const P=[i,a],A=[p,y],g=o+2,h=Math.sqrt(c*c+l*l);if(t)for(let u=o-1;u>=0;u--){const M=u*(2*Math.PI/o),$=I(Math.cos(M)*l,s,Math.sin(M)*l);P.push($);const R=I(c*Math.cos(M)/h,-l/h,c*Math.sin(M)/h);A.push(R)}else for(let u=0;u<o;u++){const M=u*(2*Math.PI/o),$=I(Math.cos(M)*l,s,Math.sin(M)*l);P.push($);const R=I(c*Math.cos(M)/h,l/h,c*Math.sin(M)/h);A.push(R)}const m=new Array,d=new Array;if(r){for(let u=3;u<P.length;u++)m.push(1),m.push(u-1),m.push(u),d.push(0),d.push(0),d.push(0);m.push(P.length-1),m.push(2),m.push(1),d.push(0),d.push(0),d.push(0)}if(f){for(let u=3;u<P.length;u++)m.push(u),m.push(u-1),m.push(0),d.push(u),d.push(u-1),d.push(1);m.push(0),m.push(2),m.push(P.length-1),d.push(1),d.push(2),d.push(A.length-1)}const w=G(3*g);for(let u=0;u<g;u++)w[3*u]=P[u][0],w[3*u+1]=P[u][1],w[3*u+2]=P[u][2];const T=G(3*g);for(let u=0;u<g;u++)T[3*u]=A[u][0],T[3*u+1]=A[u][1],T[3*u+2]=A[u][2];return[[x.POSITION,new S(w,m,3,!0)],[x.NORMAL,new S(T,d,3,!0)]]}function Pn(e,n,o,t,r,f=!0,s=!0){return new E(e,Gt(n,o,t,r,f,s))}function Mn(e,n,o,t,r,f,s){const l=r?Me(r):I(1,0,0),c=f?Me(f):I(0,0,0);s??(s=!0);const a=U();z(a,l);const i=U();F(i,a,Math.abs(n));const p=U();F(p,i,-.5),V(p,p,c);const y=I(0,1,0);Math.abs(1-Te(a,y))<.2&&ie(y,0,0,1);const P=U();B(P,a,y),z(P,P),B(y,P,a);const A=2*t+(s?2:0),g=t+(s?2:0),h=G(3*A),m=G(3*g),d=G(2*A),w=new Array(3*t*(s?4:2)),T=new Array(3*t*(s?4:2));s&&(h[3*(A-2)]=p[0],h[3*(A-2)+1]=p[1],h[3*(A-2)+2]=p[2],d[2*(A-2)]=0,d[2*(A-2)+1]=0,h[3*(A-1)]=h[3*(A-2)]+i[0],h[3*(A-1)+1]=h[3*(A-2)+1]+i[1],h[3*(A-1)+2]=h[3*(A-2)+2]+i[2],d[2*(A-1)]=1,d[2*(A-1)+1]=1,m[3*(g-2)]=-a[0],m[3*(g-2)+1]=-a[1],m[3*(g-2)+2]=-a[2],m[3*(g-1)]=a[0],m[3*(g-1)+1]=a[1],m[3*(g-1)+2]=a[2]);const u=(O,D,b)=>{w[O]=D,T[O]=b};let M=0;const $=U(),R=U();for(let O=0;O<t;O++){const D=O*(2*Math.PI/t);F($,y,Math.sin(D)),F(R,P,Math.cos(D)),V($,$,R),m[3*O]=$[0],m[3*O+1]=$[1],m[3*O+2]=$[2],F($,$,o),V($,$,p),h[3*O]=$[0],h[3*O+1]=$[1],h[3*O+2]=$[2],d[2*O]=O/t,d[2*O+1]=0,h[3*(O+t)]=h[3*O]+i[0],h[3*(O+t)+1]=h[3*O+1]+i[1],h[3*(O+t)+2]=h[3*O+2]+i[2],d[2*(O+t)]=O/t,d[2*O+1]=1;const b=(O+1)%t;u(M++,O,O),u(M++,O+t,O),u(M++,b,b),u(M++,b,b),u(M++,O+t,O),u(M++,b+t,b)}if(s){for(let O=0;O<t;O++){const D=(O+1)%t;u(M++,A-2,g-2),u(M++,O,g-2),u(M++,D,g-2)}for(let O=0;O<t;O++){const D=(O+1)%t;u(M++,O+t,g-1),u(M++,A-1,g-1),u(M++,D+t,g-1)}}const H=[[x.POSITION,new S(h,w,3,!0)],[x.NORMAL,new S(m,T,3,!0)],[x.UV0,new S(d,w,2,!0)]];return new E(e,H)}function $n(e,n,o,t,r,f){t=t||10,r=r==null||r,te(n.length>1);const s=[[0,0,0]],l=[],c=[];for(let a=0;a<t;a++){l.push([0,-a-1,-(a+1)%t-1]);const i=a/t*2*Math.PI;c.push([Math.cos(i)*o,Math.sin(i)*o])}return Et(e,c,n,s,l,r,f)}function Et(e,n,o,t,r,f,s=I(0,0,0)){const l=n.length,c=G(o.length*l*3+(6*t.length||0)),a=G(o.length*l*3+(t?6:0)),i=new Array,p=new Array;let y=0,P=0;const A=C(),g=C(),h=C(),m=C(),d=C(),w=C(),T=C(),u=C(),M=C(),$=C(),R=C(),H=C(),O=C(),D=Ot();ie(M,0,1,0),j(g,o[1],o[0]),z(g,g),f?(V(u,o[0],s),z(h,u)):ie(h,0,0,1),Se(g,h,M,M,d,h,be),ee(m,h),ee(H,d);for(let v=0;v<t.length;v++)F(w,d,t[v][0]),F(u,h,t[v][2]),V(w,w,u),V(w,w,o[0]),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2];a[P++]=-g[0],a[P++]=-g[1],a[P++]=-g[2];for(let v=0;v<r.length;v++)i.push(r[v][0]>0?r[v][0]:-r[v][0]-1+t.length),i.push(r[v][1]>0?r[v][1]:-r[v][1]-1+t.length),i.push(r[v][2]>0?r[v][2]:-r[v][2]-1+t.length),p.push(0),p.push(0),p.push(0);let b=t.length;const ne=t.length-1;for(let v=0;v<o.length;v++){let ye=!1;v>0&&(ee(A,g),v<o.length-1?(j(g,o[v+1],o[v]),z(g,g)):ye=!0,V($,A,g),z($,$),V(R,o[v-1],m),vt(o[v],$,D),xt(D,yt(R,A),u)?(j(u,u,o[v]),z(h,u),B(d,$,h),z(d,d)):Se($,m,H,M,d,h,be),ee(m,h),ee(H,d)),f&&(V(u,o[v],s),z(O,u));for(let L=0;L<l;L++)if(F(w,d,n[L][0]),F(u,h,n[L][1]),V(w,w,u),z(T,w),a[P++]=T[0],a[P++]=T[1],a[P++]=T[2],V(w,w,o[v]),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2],!ye){const he=(L+1)%l;i.push(b+L),i.push(b+l+L),i.push(b+he),i.push(b+he),i.push(b+l+L),i.push(b+l+he);for(let pe=0;pe<6;pe++){const Ve=i.length-6;p.push(i[Ve+pe]-ne)}}b+=l}const ze=o[o.length-1];for(let v=0;v<t.length;v++)F(w,d,t[v][0]),F(u,h,t[v][1]),V(w,w,u),V(w,w,ze),c[y++]=w[0],c[y++]=w[1],c[y++]=w[2];const ue=P/3;a[P++]=g[0],a[P++]=g[1],a[P++]=g[2];const fe=b-l;for(let v=0;v<r.length;v++)i.push(r[v][0]>=0?b+r[v][0]:-r[v][0]-1+fe),i.push(r[v][2]>=0?b+r[v][2]:-r[v][2]-1+fe),i.push(r[v][1]>=0?b+r[v][1]:-r[v][1]-1+fe),p.push(ue),p.push(ue),p.push(ue);const De=[[x.POSITION,new S(c,i,3,!0)],[x.NORMAL,new S(a,p,3,!0)]];return new E(e,De)}function Sn(e,n,o,t){te(n.length>1,"createPolylineGeometry(): polyline needs at least 2 points"),te(n[0].length===3,"createPolylineGeometry(): malformed vertex"),te(o==null||o.length===n.length,"createPolylineGeometry: need same number of points and normals"),te(o==null||o[0].length===3,"createPolylineGeometry(): malformed normal");const r=Qe(3*n.length),f=new Array(2*(n.length-1));let s=0,l=0;for(let a=0;a<n.length;a++){for(let i=0;i<3;i++)r[s++]=n[a][i];a>0&&(f[l++]=a-1,f[l++]=a)}const c=[[x.POSITION,new S(r,f,3,!0)]];if(o){const a=G(3*o.length);let i=0;for(let p=0;p<n.length;p++)for(let y=0;y<3;y++)a[i++]=o[p][y];c.push([x.NORMAL,new S(a,f,3,!0)])}return t&&c.push([x.COLOR,new S(t,gt(t.length/4),4)]),new E(e,c,null,Re.Line)}function bn(e,n,o,t,r,f=0){const s=new Array(18),l=[[-o,f,r/2],[t,f,r/2],[0,n+f,r/2],[-o,f,-r/2],[t,f,-r/2],[0,n+f,-r/2]],c=[0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5];for(let a=0;a<6;a++)s[3*a]=l[a][0],s[3*a+1]=l[a][1],s[3*a+2]=l[a][2];return new E(e,[[x.POSITION,new S(s,c,3,!0)]])}function Tn(e,n){const o=e.getMutableAttribute(x.POSITION).data;for(let t=0;t<o.length;t+=3){const r=o[t],f=o[t+1],s=o[t+2];ie(Q,r,f,s),Je(Q,Q,n),o[t]=Q[0],o[t+1]=Q[1],o[t+2]=Q[2]}}function In(e,n=e){const o=e.attributes,t=o.get(x.POSITION).data,r=o.get(x.NORMAL).data;if(r){const f=n.getMutableAttribute(x.NORMAL).data;for(let s=0;s<r.length;s+=3){const l=r[s+1];f[s+1]=-r[s+2],f[s+2]=l}}if(t){const f=n.getMutableAttribute(x.POSITION).data;for(let s=0;s<t.length;s+=3){const l=t[s+1];f[s+1]=-t[s+2],f[s+2]=l}}}function ge(e,n,o,t,r){return!(Math.abs(Te(n,e))>r)&&(B(o,e,n),z(o,o),B(t,o,e),z(t,t),!0)}function Se(e,n,o,t,r,f,s){return ge(e,n,r,f,s)||ge(e,o,r,f,s)||ge(e,t,r,f,s)}const be=.99619469809,Q=C();function Rn(e){return e.type==="point"}export{hn as A,On as B,pn as D,wn as E,gn as F,Se as M,Tn as O,fn as S,dn as U,bt as Z,Rn as a,ce as b,Gt as c,At as d,rn as e,vn as f,Mn as g,Pn as h,un as i,an as j,An as k,Pt as l,In as m,cn as n,mn as o,xn as p,bn as q,sn as r,yn as s,on as t,ln as u,$n as v,Sn as w,Et as x};
