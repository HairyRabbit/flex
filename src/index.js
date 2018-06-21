/**
 * flex
 *
 * A layout tool, parse '.flex' file to style and jsx tags.
 * Generate 'layout.css' file. The syntax example:
 *
 * ```
 * [foo]
 *
 * +------+-------+------+
 * | 3rem | auto  | 3rem |
 * +------+-------+------+
 * ```
 *
 * will generate:
 *
 * ```css
 * .foo {
 *   display: flex;
 * }
 *
 * .foo-left {
 *   flex: 0 3rem;
 * }
 * ```
 *
 * and jsx
 *
 * ```html
 * <div className={style['foo']}>
 *   <div className={style['foo-left']}></div>
 *   <div className={style['foo-middle']}></div>
 *   <div className={style['foo-right']}></div>
 * </div>
 * ```
 *
 * @flow
 */
