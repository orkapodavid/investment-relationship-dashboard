
import {Fragment,memo,useContext,useEffect,useState} from "react"
import {ReflexEvent,getBackendURL,isTrue,refs} from "$/utils/state"
import {useLocation} from "react-router"
import {Helmet} from "react-helmet"
import {jsx,keyframes} from "@emotion/react"
import {Toaster,toast} from "sonner"
import {ColorModeContext,EventLoopContext} from "$/utils/context"
import {WifiOff as LucideWifiOff} from "lucide-react"
import env from "$/env.json"






export const InjectedComponent = memo(({  }) => {
    
const location = useLocation();

useEffect(() => {
  window.parent.postMessage(
    { __reflex_iframe_event: { _type: "loaded" } },
    "*"
  );
}, [])

useEffect(() => {
  window.parent.postMessage(
    {
      __reflex_iframe_event: {
        _type: "navigation",
        data: { path: location.pathname, search: location.search },
      },
    },
    "*"
  );
}, [location.pathname, location.search]);



    return(
        jsx(Fragment,{},jsx(Fragment,{},),jsx(Helmet,{},jsx("script",{},"\ntry {\n    if (!globalThis._posthog_init) {\n        globalThis._posthog_init = true;\n        ! function(t, e) {\n            var o, n, p, r;\n            e.__SV || (window.posthog = e, e._i = [], e.init = function(i, s, a) {\n                function g(t, e) {\n                    var o = e.split(\".\");\n                    2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function() {\n                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))\n                    }\n                }(p = t.createElement(\"script\")).type = \"text/javascript\", p.async = !0, p.src = s.api_host.replace(\".i.posthog.com\", \"-assets.i.posthog.com\") + \"/static/array.js\", (r = t.getElementsByTagName(\"script\")[0]).parentNode.insertBefore(p, r);\n                var u = e;\n                for (void 0 !== a ? u = e[a] = [] : a = \"posthog\", u.people = u.people || [], u.toString = function(t) {\n                        var e = \"posthog\";\n                        return \"posthog\" !== a && (e += \".\" + a), t || (e += \" (stub)\"), e\n                    }, u.people.toString = function() {\n                        return u.toString(1) + \".people (stub)\"\n                    }, o = \"capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties\".split(\" \"), n = 0; n < o.length; n++) g(u, o[n]);\n                e._i.push([i, s, a])\n            }, e.__SV = 1)\n        }(document, window.posthog || []);\n        posthog.init('phc_A0MAR0wCGhXrizWmowRZcYqyZ8PMhPPQW06KEwD43aC', {\n            api_host: 'https://us.i.posthog.com',\n            person_profiles: 'always',\n            session_recording: {\n                recordCrossOriginIframes: true,\n            },\n            custom_campaign_params: [\"utm_post_id\", \"utm_influencer\"],\n        });\n    }\n} catch (error) {\n    // Silently fail if PostHog initialization fails\n    console.debug('PostHog initialization failed silently');\n}\n")))
    )
});

export const MemoizedToastProvider = memo(({  }) => {
    const { resolvedColorMode } = useContext(ColorModeContext)
refs['__toast'] = toast


    return(
        jsx(Toaster,{closeButton:false,expand:true,position:"bottom-right",richColors:true,theme:resolvedColorMode},)
    )
});

export const DefaultOverlayComponents = memo(({  }) => {
    
const [addEvents, connectErrors] = useContext(EventLoopContext);
const toast = refs['__toast'];
const toast_props = ({ ["description"] : ("Check if server is reachable at "+getBackendURL(env.EVENT).href), ["closeButton"] : true, ["duration"] : 120000, ["id"] : "websocket-error" });
const [userDismissed, setUserDismissed] = useState(false);
const [waitedForBackend, setWaitedForBackend] = useState(false);
(useEffect(
() => {
    if ((connectErrors.length >= 2)) {
        if (!userDismissed) {
            
if (waitedForBackend) {
    toast?.error("Backend is not responding.", {...toast_props, description: '', onDismiss: () => setUserDismissed(true)},)
} else {
    toast?.loading("Backend is starting.", {...toast_props, description: '', closeButton: false, onDismiss: () => setUserDismissed(true)},);
}
setTimeout(() => {
    if ((connectErrors.length >= 2)) {
        setWaitedForBackend(true);
    }
}, 10000);

        }
    } else {
        toast?.dismiss("websocket-error");
        setUserDismissed(false);  // after reconnection reset dismissed state
    }
}
, [connectErrors, waitedForBackend]))


    return(
        jsx(Fragment,{},jsx("div",{css:({ ["position"] : "fixed", ["width"] : "100vw", ["height"] : "0" }),title:("Connection Error: "+((connectErrors.length > 0) ? connectErrors[connectErrors.length - 1].message : ''))},jsx(Fragment,{},((connectErrors.length > 0)?(jsx(Fragment,{},jsx(LucideWifiOff,{css:({ ["color"] : "crimson", ["zIndex"] : 9999, ["position"] : "fixed", ["bottom"] : "33px", ["right"] : "33px", ["animation"] : (keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })+" 1s infinite") }),size:32},))):(jsx(Fragment,{},))))),jsx(Fragment,{},))
    )
});
