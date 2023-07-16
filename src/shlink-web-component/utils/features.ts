import { createContext, useContext, useMemo } from 'react';
import type { SemVer } from '../../utils/helpers/version';
import { versionMatch } from '../../utils/helpers/version';

const supportedFeatures = {
  forwardQuery: '2.9.0',
  nonRestCors: '2.9.0',
  defaultDomainRedirectsEdition: '2.10.0',
  nonOrphanVisits: '3.0.0',
  allTagsFiltering: '3.0.0',
  tagsStats: '3.0.0',
  domainVisits: '3.1.0',
  excludeBotsOnShortUrls: '3.4.0',
  filterDisabledUrls: '3.4.0',
  deviceLongUrls: '3.5.0',
} as const satisfies Record<string, SemVer>;

Object.freeze(supportedFeatures);

export type Feature = keyof typeof supportedFeatures;

export const isFeatureEnabledForVersion = (feature: Feature, serverVersion: SemVer): boolean =>
  versionMatch(serverVersion, { minVersion: supportedFeatures[feature] });

const getFeaturesForVersion = (serverVersion: SemVer): Record<Feature, boolean> => ({
  forwardQuery: isFeatureEnabledForVersion('forwardQuery', serverVersion),
  nonRestCors: isFeatureEnabledForVersion('nonRestCors', serverVersion),
  defaultDomainRedirectsEdition: isFeatureEnabledForVersion('defaultDomainRedirectsEdition', serverVersion),
  nonOrphanVisits: isFeatureEnabledForVersion('nonOrphanVisits', serverVersion),
  allTagsFiltering: isFeatureEnabledForVersion('allTagsFiltering', serverVersion),
  tagsStats: isFeatureEnabledForVersion('tagsStats', serverVersion),
  domainVisits: isFeatureEnabledForVersion('domainVisits', serverVersion),
  excludeBotsOnShortUrls: isFeatureEnabledForVersion('excludeBotsOnShortUrls', serverVersion),
  filterDisabledUrls: isFeatureEnabledForVersion('filterDisabledUrls', serverVersion),
  deviceLongUrls: isFeatureEnabledForVersion('deviceLongUrls', serverVersion),
});

export const useFeatures = (serverVersion: SemVer) => useMemo(
  () => getFeaturesForVersion(serverVersion),
  [serverVersion],
);

const FeaturesContext = createContext(getFeaturesForVersion('0.0.0'));

export const FeaturesProvider = FeaturesContext.Provider;

export const useFeature = (feature: Feature) => {
  const features = useContext(FeaturesContext);
  return features[feature];
};
