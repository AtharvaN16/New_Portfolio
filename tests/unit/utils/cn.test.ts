import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils/cn'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar')).toBe('foo bar')
    expect(cn('foo', false && 'bar')).toBe('foo')
  })

  it('handles undefined and null values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    expect(cn('foo', null, 'bar')).toBe('foo bar')
  })

  it('merges Tailwind classes and resolves conflicts', () => {
    // tailwind-merge should keep the later class when conflicts exist
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2')
  })

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })

  it('handles objects with boolean values', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('handles mixed inputs', () => {
    expect(cn('foo', { bar: true }, ['baz', 'qux'])).toBe('foo bar baz qux')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })

  it('handles real-world Tailwind use cases', () => {
    // Button variants
    const base = 'px-4 py-2 rounded font-medium'
    const primary = 'bg-blue-500 text-white'
    const disabled = 'opacity-50 cursor-not-allowed'

    expect(cn(base, primary)).toBe('px-4 py-2 rounded font-medium bg-blue-500 text-white')
    expect(cn(base, primary, disabled)).toBe(
      'px-4 py-2 rounded font-medium bg-blue-500 text-white opacity-50 cursor-not-allowed'
    )
  })

  it('resolves conflicting Tailwind spacing utilities', () => {
    // When a more specific utility comes after a general one
    expect(cn('m-4', 'mx-2')).toBe('m-4 mx-2')
    // When the same utility is repeated, keep the last one
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })
})
