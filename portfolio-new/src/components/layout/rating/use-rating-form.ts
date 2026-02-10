import { useState, useCallback } from 'react'
import type { Ratings, ContactInfo, RatingStep, RatingKey } from './types'

const initialRatings: Ratings = {
  visualDesign: 0,
  caseStudies: 0,
  usability: 0,
  overall: 0,
}

const initialContactInfo: ContactInfo = {
  name: '',
  email: '',
  referralSource: '',
  linkedinConnect: '',
}

export function useRatingForm() {
  const [ratings, setRatings] = useState<Ratings>(initialRatings)
  const [hoveredRatings, setHoveredRatings] = useState<Ratings>(initialRatings)
  const [suggestions, setSuggestions] = useState('')
  const [step, setStep] = useState<RatingStep>(1)
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo)

  const updateRating = useCallback((key: RatingKey, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateHoveredRating = useCallback((key: RatingKey, value: number) => {
    setHoveredRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateContactField = useCallback(
    <K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) => {
      setContactInfo((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const reset = useCallback(() => {
    setStep(1)
    setRatings(initialRatings)
    setHoveredRatings(initialRatings)
    setSuggestions('')
    setContactInfo(initialContactInfo)
  }, [])

  const submit = useCallback(() => {
    // TODO: Send to backend/analytics service
  }, [])

  return {
    // State
    ratings,
    hoveredRatings,
    suggestions,
    step,
    contactInfo,
    // Actions
    updateRating,
    updateHoveredRating,
    setSuggestions,
    setStep,
    updateContactField,
    reset,
    submit,
  }
}
